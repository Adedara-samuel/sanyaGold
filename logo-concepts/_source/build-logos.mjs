/**
 * Logo concepts generator: two concepts each for
 *   - Sanyagold Accounting, Advisory and Consulting Services
 *   - W O Oyebamiji CPA LLC
 *
 * Genuine vector artwork: every letter is converted to outlines from real font files.
 * Exports per concept: SVG, vector PDF, layered PSD, PNG (transparent / white bg / black / white), JPEG,
 * plus a presentation board (SVG, PNG, vector PDF).
 *
 * Usage: node build2.mjs <output-dir>
 */
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import { writePsdBuffer, readPsd } from "ag-psd";

const OUT = process.argv[2];
if (!OUT) throw new Error("Pass the output directory");
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));

/* ───────────────────────────── Fonts & outlined text ───────────────────────────── */
const font = (n) => opentype.loadSync(path.join(HERE, "fonts", `${n}.woff`));
const F = {
  jost400: font("jost-400"),
  jost500: font("jost-500"),
  corm600: font("cormorant-garamond-600"),
  corm700: font("cormorant-garamond-700"),
  ebg400: font("eb-garamond-400"),
  ebg500: font("eb-garamond-500"),
  mont400: font("montserrat-400"),
  mont500: font("montserrat-500"),
  mont600: font("montserrat-600"),
  man500: font("manrope-500"),
  man600: font("manrope-600"),
  man700: font("manrope-700"),
  pf600: font("playfair-display-600"),
  pf700: font("playfair-display-700"),
};

function layout(f, str, size, tracking = 0) {
  const glyphs = f.stringToGlyphs(str);
  const sc = size / f.unitsPerEm;
  const xs = [];
  let x = 0;
  glyphs.forEach((g, i) => {
    xs.push(x);
    x += g.advanceWidth * sc;
    if (i < glyphs.length - 1) x += (f.getKerningValue(g, glyphs[i + 1]) || 0) * sc + tracking * size;
  });
  return { glyphs, xs, width: x, sc };
}

function text(f, str, x, y, size, { tracking = 0, anchor = "start", skip = [] } = {}) {
  const L = layout(f, str, size, tracking);
  const off = anchor === "middle" ? -L.width / 2 : anchor === "end" ? -L.width : 0;
  let d = "";
  const box = { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity };
  const glyphBoxes = [];
  L.glyphs.forEach((g, i) => {
    const p = g.getPath(x + off + L.xs[i], y, size);
    const b = p.getBoundingBox();
    glyphBoxes.push(b);
    if (!skip.includes(i)) d += p.toPathData(3);
    if (Number.isFinite(b.x1) && !(b.x1 === 0 && b.x2 === 0)) {
      box.x1 = Math.min(box.x1, b.x1);
      box.y1 = Math.min(box.y1, b.y1);
      box.x2 = Math.max(box.x2, b.x2);
      box.y2 = Math.max(box.y2, b.y2);
    }
  });
  return { d, box, width: L.width, glyphBoxes };
}
const inkWidth = (f, str, size, tracking) => {
  const t = text(f, str, 0, 0, size, { tracking });
  return t.box.x2 - t.box.x1;
};
const fitSize = (f, str, targetWidth, tracking) => targetWidth / inkWidth(f, str, 1, tracking);
const capSize = (f, capHeight) => {
  const b = f.charToGlyph("H").getBoundingBox();
  return capHeight / ((b.y2 - b.y1) / f.unitsPerEm);
};
/** Outlined text whose ink box starts at (0,0). */
function inkText(f, str, size, tracking = 0) {
  const probe = text(f, str, 0, 0, size, { tracking });
  const t = text(f, str, -probe.box.x1, -probe.box.y1, size, { tracking });
  return { d: t.d, w: probe.box.x2 - probe.box.x1, h: probe.box.y2 - probe.box.y1 };
}

/* ───────────────────────────── Geometry ───────────────────────────── */
const n = (v) => +v.toFixed(3);
const rectD = (x, y, w, h) => `M${n(x)} ${n(y)}H${n(x + w)}V${n(y + h)}H${n(x)}Z`;
const polyD = (pts, reverse = false) => {
  const p = reverse ? [...pts].reverse() : pts;
  return "M" + p.map(([a, b]) => `${n(a)} ${n(b)}`).join("L") + "Z";
};
function octPts(x, y, w, h, c) {
  return [[x + c, y], [x + w - c, y], [x + w, y + c], [x + w, y + h - c], [x + w - c, y + h], [x + c, y + h], [x, y + h - c], [x, y + c]];
}
function octRing(x, y, w, h, c, tx, ty = tx) {
  const cIn = Math.max(0, c - ((tx + ty) / 2) * (2 - Math.SQRT2));
  return polyD(octPts(x, y, w, h, c)) + polyD(octPts(x + tx, y + ty, w - 2 * tx, h - 2 * ty, cIn), true);
}
const diamondD = (cx, cy, r) => `M${n(cx)} ${n(cy - r)}L${n(cx + r)} ${n(cy)}L${n(cx)} ${n(cy + r)}L${n(cx - r)} ${n(cy)}Z`;
/** Circle as two arcs; `reverse` flips winding (for rings with even-odd fill). */
const circleD = (cx, cy, r, reverse = false) =>
  reverse
    ? `M${n(cx + r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 0 ${n(cx - r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 0 ${n(cx + r)} ${n(cy)}Z`
    : `M${n(cx + r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 1 ${n(cx - r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 1 ${n(cx + r)} ${n(cy)}Z`;
const ringD = (cx, cy, R, t) => circleD(cx, cy, R) + circleD(cx, cy, R - t, true);

/* Element: { d, role, evenodd? , t?:[dx,dy,s] }   Lockup: { w, h, els } */
const shift = (els, dx, dy) => els.map((e) => ({ ...e, t: [(e.t?.[0] ?? 0) + dx, (e.t?.[1] ?? 0) + dy, e.t?.[2] ?? 1] }));
const scaleEls = (els, s) => els.map((e) => ({ ...e, t: [(e.t?.[0] ?? 0) * s, (e.t?.[1] ?? 0) * s, (e.t?.[2] ?? 1) * s] }));

/** Generic two-line text block (name + descriptor). */
function textBlock({ wf, word, cap, wTrack, df, desc, dTrack, dFit = true, dCap, gap, align = "start" }) {
  const w = inkText(wf, word, capSize(wf, cap), wTrack);
  const dSize = dFit ? fitSize(df, desc, w.w, dTrack) : capSize(df, dCap);
  const d = inkText(df, desc, dSize, dTrack);
  const W = Math.max(w.w, d.w);
  const xw = align === "center" ? (W - w.w) / 2 : 0;
  const xd = align === "center" ? (W - d.w) / 2 : 0;
  return {
    w: W,
    h: w.h + gap + d.h,
    els: [
      { d: w.d, role: "word", t: [xw, 0, 1] },
      { d: d.d, role: "desc", t: [xd, w.h + gap, 1] },
    ],
  };
}

function horizontal(mark, tb, gap, divider) {
  const ty = (mark.h - tb.h) / 2;
  const els = [...mark.els];
  let x = mark.w + gap;
  if (divider) {
    const dh = mark.h * divider.h;
    els.push({ d: rectD(x, (mark.h - dh) / 2, divider.w, dh), role: divider.role });
    x += divider.w + gap;
  }
  return { w: x + tb.w, h: mark.h, els: [...els, ...shift(tb.els, x, ty)] };
}
function stacked(mark, tb, gap, markScale = 1) {
  const mw = mark.w * markScale;
  const mh = mark.h * markScale;
  const W = Math.max(mw, tb.w);
  return { w: W, h: mh + gap + tb.h, els: [...shift(scaleEls(mark.els, markScale), (W - mw) / 2, 0), ...shift(tb.els, (W - tb.w) / 2, mh + gap)] };
}

/* ═════════════════ SANYAGOLD · CONCEPT A — The Golden Line ═════════════════ */
/**
 * Monoline S on a strict square grid (100 × 100, stroke 10).
 * Point-symmetric; outer terminals cut at 45°; precise stencil gaps; the middle stroke is gold.
 */
function sgMarkA() {
  const s = 100;
  const t = 10.5;
  const g = 5.5;
  const mid = (s - t) / 2;
  return {
    w: s,
    h: s,
    els: [
      { d: polyD([[0, 0], [s, 0], [s - t, t], [0, t]]), role: "primary" }, // top bar, 45° terminal
      { d: rectD(0, 0, t, mid - g), role: "primary" }, // left upper stem
      { d: rectD(0, mid, s, t), role: "accent" }, // the golden line
      { d: rectD(s - t, mid + t + g, t, s - (mid + t + g)), role: "primary" }, // right lower stem
      { d: polyD([[t, s - t], [s, s - t], [s, s], [0, s]]), role: "primary" }, // bottom bar, 45° terminal
    ],
  };
}
const SG_DESC = "ACCOUNTING, ADVISORY AND CONSULTING SERVICES";
function sgTextA(align) {
  return textBlock({ wf: F.ebg500, word: "SANYAGOLD", cap: 30, wTrack: 0.2, df: F.mont500, desc: SG_DESC, dTrack: 0.28, gap: 15, align });
}
function sgLockupA(kind) {
  const m = sgMarkA();
  if (kind === "symbol") return m;
  if (kind === "wordmark") return sgTextA("start");
  if (kind === "horizontal") return horizontal(m, sgTextA("start"), 34, { w: 1, h: 0.62, role: "rule" });
  return stacked(m, sgTextA("center"), 38, 0.92);
}

/* ═════════════════ SANYAGOLD · CONCEPT B — The Hallmark (as approved) ═════════════════ */
function sgMarkB() {
  const H = 100;
  const size = capSize(F.corm700, 47);
  const sg = text(F.corm700, "SG", 0, 0, size, { tracking: -0.015 });
  const inkW = sg.box.x2 - sg.box.x1;
  const W = inkW + 54;
  const c = 17;
  const inset = 4.2 + 3.6;
  const letters = text(F.corm700, "SG", (W - inkW) / 2 - sg.box.x1, (H - (sg.box.y2 - sg.box.y1)) / 2 - sg.box.y1, size, { tracking: -0.015 });
  return {
    w: W,
    h: H,
    els: [
      { d: octRing(0, 0, W, H, c, 4.2), role: "frame", evenodd: true },
      { d: octRing(inset, inset, W - 2 * inset, H - 2 * inset, c - inset * (2 - Math.SQRT2), 1.25), role: "frame", evenodd: true },
      { d: letters.d, role: "mono" },
    ],
  };
}
function sgWordB(cap) {
  const size = capSize(F.corm600, cap);
  const tracking = 0.2;
  const word = "SANYAGOLD";
  const oi = word.indexOf("O");
  const probe = text(F.corm600, word, 0, 0, size, { tracking });
  const t = text(F.corm600, word, -probe.box.x1, -probe.box.y1, size, { tracking, skip: [oi] });
  const ob = t.glyphBoxes[oi];
  const ow = (ob.x2 - ob.x1) * 0.94;
  const ox = ob.x1 + (ob.x2 - ob.x1 - ow) / 2;
  return {
    w: probe.box.x2 - probe.box.x1,
    h: cap,
    els: [
      { d: t.d, role: "word" },
      { d: octRing(ox, 0, ow, cap, ow * 0.3, size * 0.088, size * 0.03), role: "accent", evenodd: true },
    ],
  };
}
function sgDescB(width) {
  const d = inkText(F.mont500, SG_DESC, fitSize(F.mont500, SG_DESC, width, 0.3), 0.3);
  return { w: width, h: d.h, els: [{ d: d.d, role: "desc" }] };
}
function ruleWithDiamond(width, role = "rule") {
  const r = 3.4;
  const half = width / 2 - r - 9;
  return {
    w: width,
    h: r * 2,
    els: [
      { d: rectD(0, r - 0.45, half, 0.9), role },
      { d: rectD(width - half, r - 0.45, half, 0.9), role },
      { d: diamondD(width / 2, r, r), role },
    ],
  };
}
function sgLockupB(kind) {
  const mark = sgMarkB();
  if (kind === "symbol") return mark;
  const word = sgWordB(kind === "horizontal" ? 30 : 34);
  const desc = sgDescB(word.w);
  if (kind === "wordmark") {
    const rule = ruleWithDiamond(word.w);
    return { w: word.w, h: word.h + 15 + rule.h + 13 + desc.h, els: [...word.els, ...shift(rule.els, 0, word.h + 15), ...shift(desc.els, 0, word.h + 15 + rule.h + 13)] };
  }
  if (kind === "horizontal") {
    const block = { w: word.w, h: word.h + 15 + desc.h, els: [...word.els, ...shift(desc.els, 0, word.h + 15)] };
    return horizontal(mark, block, 30, { w: 0.9, h: 0.66, role: "rule" });
  }
  const rule = ruleWithDiamond(word.w);
  const W = Math.max(mark.w, word.w);
  let y = 0;
  const els = [...shift(mark.els, (W - mark.w) / 2, 0)];
  y += mark.h + 34;
  els.push(...shift(word.els, (W - word.w) / 2, y));
  y += word.h + 17;
  els.push(...shift(rule.els, (W - rule.w) / 2, y));
  y += rule.h + 15;
  els.push(...shift(desc.els, (W - desc.w) / 2, y));
  return { w: W, h: y + desc.h, els };
}

/* ═════════════════ W O OYEBAMIJI CPA · CONCEPT A — The Interlock ═════════════════ */
/**
 * Two monoline squares on one grid, offset and woven together: at the first crossing the
 * navy square passes over the brass one, at the second it passes under. Precise gaps mark
 * each crossing. Square = 64, offset = 36, stroke = 9, gap = 4.5.
 */
function woMarkA() {
  const S = 64;
  const off = 36;
  const t = 9;
  const g = 4.5;
  const cut = t / 2 + g; // half-width of each crossing gap
  // Edge rectangles (outer edges flush to each square's box).
  const sq = (x, y) => ({
    top: [x, y, S, t],
    bottom: [x, y + S - t, S, t],
    left: [x, y, t, S],
    right: [x + S - t, y, t, S],
  });
  const A = sq(0, 0); // navy: the client's records
  const B = sq(off, off); // brass: independent review
  const els = [];
  const add = (r, role) => els.push({ d: rectD(...r), role });
  // Crossing 1: A.right (x = S - t/2) over B.top  -> split B.top around that x.
  // Crossing 2: B.left (x = off + t/2) over A.bottom -> split A.bottom around that x.
  const splitH = ([x, y, w, h], at) => [
    [x, y, at - cut - x, h],
    [at + cut, y, x + w - (at + cut), h],
  ];
  const ax = S - t / 2;
  const bx = off + t / 2;
  add(A.top, 'primary');
  add(A.left, 'primary');
  add(A.right, 'primary');
  splitH(A.bottom, bx).forEach((r) => add(r, 'primary'));
  splitH(B.top, ax).forEach((r) => add(r, 'accent'));
  add(B.left, 'accent');
  add(B.right, 'accent');
  add(B.bottom, 'accent');
  return { w: off + S, h: off + S, els };
}
function woTextA(align) {
  return textBlock({ wf: F.man700, word: "W O OYEBAMIJI", cap: 28, wTrack: 0.12, df: F.man600, desc: "CPA LLC", dTrack: 0.6, dFit: false, dCap: 11, gap: 14, align });
}
function woLockupA(kind) {
  const m = woMarkA();
  if (kind === "symbol") return m;
  if (kind === "wordmark") return woTextA("start");
  if (kind === "horizontal") return horizontal(m, woTextA("start"), 32, { w: 1, h: 0.62, role: "rule" });
  return stacked(m, woTextA("center"), 36, 0.8);
}

/* ═════════════════ W O OYEBAMIJI CPA · CONCEPT B — The Seal ═════════════════ */
/** Transform opentype path commands by rotation (deg) and translation. */
function transformPath(p, ang, tx, ty) {
  const c = Math.cos((ang * Math.PI) / 180);
  const s = Math.sin((ang * Math.PI) / 180);
  const T = (x, y) => [x * c - y * s + tx, x * s + y * c + ty];
  let d = "";
  for (const cmd of p.commands) {
    if (cmd.type === "M" || cmd.type === "L") {
      const [x, y] = T(cmd.x, cmd.y);
      d += `${cmd.type}${n(x)} ${n(y)}`;
    } else if (cmd.type === "C") {
      const [x1, y1] = T(cmd.x1, cmd.y1);
      const [x2, y2] = T(cmd.x2, cmd.y2);
      const [x, y] = T(cmd.x, cmd.y);
      d += `C${n(x1)} ${n(y1)} ${n(x2)} ${n(y2)} ${n(x)} ${n(y)}`;
    } else if (cmd.type === "Q") {
      const [x1, y1] = T(cmd.x1, cmd.y1);
      const [x, y] = T(cmd.x, cmd.y);
      d += `Q${n(x1)} ${n(y1)} ${n(x)} ${n(y)}`;
    } else if (cmd.type === "Z") d += "Z";
  }
  return d;
}
/** Text set around a full circle (clockwise, reading from the top), evenly spaced to fill it. */
function circleText(f, str, cx, cy, r, cap) {
  const size = capSize(f, cap);
  const glyphs = f.stringToGlyphs(str);
  const sc = size / f.unitsPerEm;
  const adv = glyphs.map((g) => g.advanceWidth * sc);
  const total = adv.reduce((a, b) => a + b, 0);
  const extra = (2 * Math.PI * r - total) / glyphs.length;
  let arc = 0;
  let d = "";
  glyphs.forEach((g, i) => {
    const centre = arc + adv[i] / 2;
    const ang = (centre / r) * (180 / Math.PI); // degrees clockwise from top
    const p = g.getPath(-adv[i] / 2, 0, size);
    const rad = ((ang - 90) * Math.PI) / 180;
    d += transformPath(p, ang, cx + r * Math.cos(rad), cy + r * Math.sin(rad));
    arc += adv[i] + extra;
  });
  return d;
}
function woMarkB() {
  const R = 50;
  const c = R;
  const els = [
    { d: ringD(c, c, R, 3.2), role: "frame", evenodd: true },
    { d: ringD(c, c, R - 6.2, 0.9), role: "frame", evenodd: true },
    { d: ringD(c, c, R - 22, 0.9), role: "frame", evenodd: true },
  ];
  // Name around the seal: baseline radius sits between the outer and inner rings.
  const cap = 6.4;
  els.push({ d: circleText(F.man600, "W O OYEBAMIJI  ·  CPA LLC  ·  ", c, c, 31.8, cap), role: "ring" });
  // Monogram
  const mono = inkText(F.pf700, "WO", capSize(F.pf700, 18), -0.02);
  els.push({ d: mono.d, role: "mono", t: [c - mono.w / 2, c - mono.h / 2, 1] });
  return { w: 2 * R, h: 2 * R, els };
}
function woTextB(align) {
  return textBlock({ wf: F.pf600, word: "W O OYEBAMIJI", cap: 30, wTrack: 0.1, df: F.man600, desc: "CPA LLC", dTrack: 0.62, dFit: false, dCap: 11, gap: 16, align });
}
function woLockupB(kind) {
  const m = woMarkB();
  if (kind === "symbol") return m;
  if (kind === "wordmark") return woTextB("start");
  if (kind === "horizontal") return horizontal(m, woTextB("start"), 30, { w: 0.9, h: 0.6, role: "rule" });
  const tb = woTextB("center");
  const rule = ruleWithDiamond(tb.w * 0.5, "rule");
  // stacked: seal, name, rule, CPA LLC
  const name = inkText(F.pf600, "W O OYEBAMIJI", capSize(F.pf600, 30), 0.1);
  const sub = inkText(F.man600, "CPA LLC", capSize(F.man600, 11), 0.62);
  const W = Math.max(m.w * 1.15, name.w);
  let y = 0;
  const els = [...shift(scaleEls(m.els, 1.15), (W - m.w * 1.15) / 2, 0)];
  y += m.h * 1.15 + 32;
  els.push({ d: name.d, role: "word", t: [(W - name.w) / 2, y, 1] });
  y += name.h + 16;
  els.push(...shift(rule.els, (W - rule.w) / 2, y));
  y += rule.h + 14;
  els.push({ d: sub.d, role: "desc", t: [(W - sub.w) / 2, y, 1] });
  return { w: W, h: y + sub.h, els };
}

/* ───────────────────────────── Colourways ───────────────────────────── */
const mono = (hex, roles) => Object.fromEntries(roles.map((r) => [r, hex]));
const R_A = ["primary", "accent", "word", "desc", "rule"];
const R_B = ["frame", "mono", "word", "accent", "desc", "rule", "ring"];

/* ───────────────────────────── SVG rendering ───────────────────────────── */
function elsToSvg(els, colors, onlyRoles) {
  return els
    .filter((e) => !onlyRoles || onlyRoles.includes(e.role))
    .map((e) => {
      const [tx, ty, s] = e.t ?? [0, 0, 1];
      const tr = tx || ty || s !== 1 ? ` transform="translate(${n(tx)} ${n(ty)}) scale(${n(s)})"` : "";
      return `<path d="${e.d}" fill="${colors[e.role]}"${e.evenodd ? ' fill-rule="evenodd"' : ""}${tr}/>`;
    })
    .join("");
}
function logoSvg(L, colors, { pad = 0.2, pxLong = null, bg = colors.bg, onlyRoles } = {}) {
  const p = L.h * pad;
  const W = L.w + 2 * p;
  const H = L.h + 2 * p;
  const scale = pxLong ? pxLong / Math.max(W, H) : 1;
  const size = pxLong ? ` width="${Math.round(W * scale)}" height="${Math.round(H * scale)}"` : "";
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(W)} ${n(H)}"${size}>` +
    (bg ? `<rect width="${n(W)}" height="${n(H)}" fill="${bg}"/>` : "") +
    `<g transform="translate(${n(p)} ${n(p)})">${elsToSvg(L.els, colors, onlyRoles)}</g></svg>`
  );
}
function place(L, colors, { x, y, w, h }, maxH = Infinity) {
  const s = Math.min(w / L.w, h / L.h, maxH / L.h);
  return `<g transform="translate(${n(x + (w - L.w * s) / 2)} ${n(y + (h - L.h * s) / 2)}) scale(${n(s)})">${elsToSvg(L.els, colors)}</g>`;
}
function copy(str, x, y, size, { f = F.mont400, fill = "#2B2B2B", tracking = 0, anchor = "start" } = {}) {
  return `<path d="${text(f, str, x, y, size, { tracking, anchor }).d}" fill="${fill}"/>`;
}
function para(str, x, y, size, maxW, { f = F.mont400, fill = "#3A3A3A", lh = 1.6 } = {}) {
  const lines = [];
  let line = "";
  for (const w of str.split(" ")) {
    const test = line ? `${line} ${w}` : w;
    if (layout(f, test, size).width > maxW && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines.map((l, i) => copy(l, x, y + i * size * lh, size, { f, fill })).join("");
}

/* ───────────────────────────── Presentation board ───────────────────────────── */
const BW = 2400;
const BH = 4120;
function board(c) {
  const M = 80;
  const W = BW;
  const card = (x, y, w, h, fill = "#FFFFFF", stroke = "#E4DED2") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const label = (str, x, y, fill = "#8A857D") => copy(str, x, y, 17, { f: F.mont600, fill, tracking: 0.22 });
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${BH}" width="${W}" height="${BH}"><rect width="${W}" height="${BH}" fill="${c.paper}"/>`;
  s += copy(c.letter, M, 150, 86, { f: F.corm700, fill: c.ink });
  s += copy(c.title.toUpperCase(), M, 205, 24, { f: F.mont600, fill: c.accentText, tracking: 0.24 });
  s += copy(c.client.toUpperCase(), W - M, 150, 20, { f: F.mont600, fill: c.ink, tracking: 0.18, anchor: "end" });
  s += copy("Logo proposal for client review · November 2026", W - M, 190, 20, { f: F.mont400, fill: "#7C776F", anchor: "end" });
  s += `<rect x="${M}" y="245" width="${W - 2 * M}" height="2" fill="${c.ruleColor}"/>`;

  let y = 290;
  s += card(M, y, W - 2 * M, 800);
  s += label("01  PRIMARY LOGO", M + 40, y + 60);
  s += place(c.lockup(c.primaryKind), c.colorways["full-color"], { x: M + 200, y: y + 120, w: W - 2 * M - 400, h: 600 }, c.primaryKind === "horizontal" ? 290 : 560);

  y += 840;
  const cw = (W - 2 * M - 80) / 3;
  [
    ["02  HORIZONTAL", "horizontal", 150],
    ["03  STACKED", "stacked", 300],
    [`04  ${c.symbolLabel}`, "symbol", 210],
  ].forEach(([lab, kind, maxH], i) => {
    const x = M + i * (cw + 40);
    s += card(x, y, cw, 470);
    s += label(lab, x + 32, y + 52);
    s += place(c.lockup(kind), c.colorways["full-color"], { x: x + 50, y: y + 90, w: cw - 100, h: 330 }, maxH);
  });

  y += 510;
  const vw = (W - 2 * M - 120) / 4;
  [
    ["05  BLACK", "black", "#FFFFFF", "#E4DED2", "#8A857D"],
    ["06  WHITE ON DARK", "white", c.dark, c.dark, "#BDB6A8"],
    ["07  GRAYSCALE", "grayscale", "#FFFFFF", "#E4DED2", "#8A857D"],
    ["08  REVERSED COLOUR", "reversed", c.dark, c.dark, "#BDB6A8"],
  ].forEach(([lab, cwName, fill, stroke, lc], i) => {
    const x = M + i * (vw + 40);
    s += card(x, y, vw, 400, fill, stroke);
    s += label(lab, x + 30, y + 50, lc);
    s += place(c.lockup("stacked"), { ...c.colorways[cwName], bg: null }, { x: x + 40, y: y + 85, w: vw - 80, h: 280 }, 250);
  });

  y += 440;
  const half = (W - 2 * M - 40) / 2;
  s += card(M, y, half, 560);
  s += label("09  COLOUR PALETTE", M + 32, y + 52);
  const sw = (half - 64 - 72) / 4;
  c.palette.forEach((p, i) => {
    const x = M + 32 + i * (sw + 24);
    s += `<rect x="${n(x)}" y="${y + 90}" width="${n(sw)}" height="250" rx="12" fill="${p.hex}" stroke="#E4DED2" stroke-width="2"/>`;
    s += copy(p.name, x, y + 385, 22, { f: F.mont600, fill: "#2B2B2B" });
    s += copy(p.hex, x, y + 420, 22, { f: F.mont500, fill: "#5E5A54" });
    s += para(p.use, x, y + 460, 16, sw, { fill: "#7C776F", lh: 1.45 });
  });
  const tx = M + half + 40;
  s += card(tx, y, half, 560);
  s += label("10  TYPOGRAPHY", tx + 32, y + 52);
  let ty = y + 140;
  for (const t of c.type) {
    s += copy(t.sample, tx + 32, ty, t.sampleSize, { f: t.f, fill: c.ink, tracking: t.tracking ?? 0 });
    s += copy(`${t.name}  ·  ${t.role}`, tx + 32, ty + 42, 19, { f: F.mont500, fill: "#7C776F" });
    ty += t.gap;
  }
  s += para(c.typeNote, tx + 32, y + 500, 16, half - 64, { fill: "#7C776F", lh: 1.5 });

  y += 600;
  s += card(M, y, W - 2 * M, 370);
  s += label("11  DESIGN CONCEPT", M + 40, y + 60);
  s += copy(c.conceptTitle, M + 40, y + 130, 46, { f: F.corm700, fill: c.ink });
  s += para(c.concept, M + 40, y + 185, 23, W - 2 * M - 80, { fill: "#3A3A3A", lh: 1.62 });

  y += 410;
  s += `<rect x="${M}" y="${y}" width="${W - 2 * M}" height="910" rx="18" fill="${c.mockBg}"/>`;
  s += label("12  APPLICATIONS (MOCKUPS)", M + 40, y + 60, "#7C776F");
  s += mockups(c, M + 40, y + 100);
  s += copy(`${c.letter} · Confidential proposal for ${c.client}. Not final artwork until approved.`, M, BH - 50, 17, { f: F.mont400, fill: "#9A948A" });
  return s + "</svg>";
}

function mockups(c, X, Y) {
  const shadow = (x, y, w, h, r = 10) => `<rect x="${x + 8}" y="${y + 12}" width="${w}" height="${h}" rx="${r}" fill="#000" fill-opacity="0.07"/>`;
  const full = c.colorways["full-color"];
  const rev = c.colorways.reversed;
  let s = "";
  const bw = 580;
  const bh = 331;
  s += shadow(X, Y + 10, bw, bh) + `<rect x="${X}" y="${Y + 10}" width="${bw}" height="${bh}" rx="10" fill="#FFFFFF"/>`;
  s += place(c.lockup("stacked"), full, { x: X + 60, y: Y + 50, w: bw - 120, h: bh - 80 }, 210);
  const by = Y + 10 + bh + 40;
  s += shadow(X, by, bw, bh) + `<rect x="${X}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="${c.dark}"/>`;
  s += place(c.lockup("symbol"), rev, { x: X + 40, y: by + 40, w: 140, h: 80 }, 70);
  s += copy("Full Name", X + 40, by + 175, 30, { f: F.corm700, fill: "#F6F1E7" });
  s += copy("TITLE / POSITION", X + 40, by + 205, 14, { f: F.mont600, fill: c.accentOnDark, tracking: 0.2 });
  c.contacts.forEach((t, i) => (s += copy(t, X + 40, by + 250 + i * 26, 16, { f: F.mont400, fill: "#E9E3D7" })));
  s += copy("BUSINESS CARD · FRONT & BACK", X, by + bh + 50, 14, { f: F.mont600, fill: "#8A857D", tracking: 0.2 });

  const lx = X + bw + 70;
  const lw = 470;
  const lh = 665;
  s += shadow(lx, Y + 10, lw, lh, 4) + `<rect x="${lx}" y="${Y + 10}" width="${lw}" height="${lh}" rx="4" fill="#FFFFFF"/>`;
  s += place(c.lockup("horizontal"), full, { x: lx + 40, y: Y + 50, w: 260, h: 70 }, 52);
  s += `<rect x="${lx + 40}" y="${Y + 140}" width="${lw - 80}" height="1.5" fill="${c.ruleColor}"/>`;
  [0, 1, 2].forEach((i) => (s += `<rect x="${lx + 40}" y="${Y + 180 + i * 18}" width="${140 - i * 25}" height="6" rx="3" fill="#D9D3C7"/>`));
  for (let i = 0; i < 14; i++) s += `<rect x="${lx + 40}" y="${Y + 270 + i * 22}" width="${i % 5 === 4 ? 230 : lw - 80 - (i % 3) * 18}" height="6" rx="3" fill="#E6E1D7"/>`;
  s += `<rect x="${lx + 40}" y="${Y + lh - 50}" width="${lw - 80}" height="1" fill="#E4DED2"/>`;
  s += copy(c.contacts.join("  ·  "), lx + lw / 2, Y + lh - 22, 12, { f: F.mont400, fill: "#8A857D", anchor: "middle" });
  s += copy("LETTERHEAD", lx, Y + lh + 50, 14, { f: F.mont600, fill: "#8A857D", tracking: 0.2 });

  const dx = lx + lw + 70;
  s += shadow(dx, Y + 10, lw, lh, 4) + `<rect x="${dx}" y="${Y + 10}" width="${lw}" height="${lh}" rx="4" fill="${c.dark}"/>`;
  s += place(c.lockup("stacked"), rev, { x: dx + 60, y: Y + 110, w: lw - 120, h: 230 }, 210);
  s += `<rect x="${dx + 60}" y="${Y + 420}" width="60" height="3" fill="${c.accentOnDark}"/>`;
  s += copy("Company Profile", dx + 60, Y + 475, 38, { f: F.corm700, fill: "#F6F1E7" });
  s += copy("2026", dx + 60, Y + 515, 22, { f: F.mont500, fill: c.accentOnDark, tracking: 0.2 });
  s += copy("COMPANY PROFILE / DOCUMENT COVER", dx, Y + lh + 50, 14, { f: F.mont600, fill: "#8A857D", tracking: 0.2 });

  const wx = dx + lw + 70;
  const ww = X + 2160 - wx;
  s += shadow(wx, Y + 10, ww, 665) + `<rect x="${wx}" y="${Y + 10}" width="${ww}" height="665" rx="10" fill="#FFFFFF"/>`;
  s += `<rect x="${wx}" y="${Y + 10}" width="${ww}" height="44" rx="10" fill="#EDE8DF"/>`;
  ["#E0675A", "#E8B44B", "#5DB86A"].forEach((col, i) => (s += `<circle cx="${wx + 24 + i * 20}" cy="${Y + 32}" r="6" fill="${col}"/>`));
  s += `<rect x="${wx + 100}" y="${Y + 22}" width="${ww - 130}" height="20" rx="10" fill="#FFFFFF"/>`;
  s += place(c.lockup("horizontal"), full, { x: wx + 24, y: Y + 74, w: 210, h: 56 }, 44);
  s += `<rect x="${wx}" y="${Y + 150}" width="${ww}" height="1.5" fill="#ECE6DC"/>`;
  s += `<rect x="${wx + 24}" y="${Y + 180}" width="${ww - 48}" height="200" rx="8" fill="${c.mockBg}"/>`;
  s += copy(c.heroLines[0], wx + 44, Y + 250, 26, { f: F.corm700, fill: c.ink });
  s += copy(c.heroLines[1], wx + 44, Y + 282, 26, { f: F.corm700, fill: c.ink });
  s += `<rect x="${wx + 44}" y="${Y + 315}" width="120" height="34" rx="17" fill="${c.ink}"/>`;
  s += copy("Book a call", wx + 104, Y + 337, 13, { f: F.mont600, fill: "#FFFFFF", anchor: "middle" });
  for (let i = 0; i < 6; i++) s += `<rect x="${wx + 24}" y="${Y + 410 + i * 34}" width="${ww - 48 - (i % 2) * 60}" height="10" rx="5" fill="#ECE7DE"/>`;
  s += copy("WEBSITE HEADER", wx, Y + 715, 14, { f: F.mont600, fill: "#8A857D", tracking: 0.2 });
  return s;
}

/* ───────────────────────────── Exporters ───────────────────────────── */
const png = (svg, file) => sharp(Buffer.from(svg), { density: 72 }).png({ compressionLevel: 9 }).toFile(file);
function pdf(svg, file, w, h, title) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: [w, h], margin: 0, info: { Title: title, Author: "Logo proposal", Creator: "Vector artwork, text outlined" } });
    const stream = fs.createWriteStream(file);
    doc.pipe(stream);
    SVGtoPDF(doc, svg, 0, 0, { width: w, height: h, preserveAspectRatio: "xMidYMid meet" });
    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}
async function raw(svg) {
  const { data, info } = await sharp(Buffer.from(svg), { density: 72 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { width: info.width, height: info.height, data: new Uint8ClampedArray(data.buffer, data.byteOffset, data.length) };
}
async function psd(L, colors, layers, file, pxLong = 3000) {
  const comp = await raw(logoSvg(L, colors, { pxLong, bg: "#FFFFFF" }));
  const { width, height } = comp;
  const children = [{ name: "Background", imageData: { width, height, data: new Uint8ClampedArray(width * height * 4).fill(255) }, left: 0, top: 0 }];
  for (const [name, roles] of layers) children.push({ name, imageData: await raw(logoSvg(L, colors, { pxLong, bg: null, onlyRoles: roles })), left: 0, top: 0 });
  fs.writeFileSync(file, Buffer.from(writePsdBuffer({ width, height, imageData: comp, children })));
  return readPsd(fs.readFileSync(file), { skipLayerImageData: true, skipCompositeImageData: true, skipThumbnail: true }).children.map((l) => l.name);
}

async function buildConcept(c) {
  const root = path.join(OUT, c.folder);
  fs.rmSync(root, { recursive: true, force: true });
  for (const d of ["vector/svg", "vector/pdf", "psd", "png/transparent", "png/white-background", "png/black", "png/white", "jpg", "presentation"])
    fs.mkdirSync(path.join(root, d), { recursive: true });
  for (const kind of ["horizontal", "stacked", "symbol", "wordmark"]) {
    const L = c.lockup(kind);
    for (const [cw, colors] of Object.entries(c.colorways)) {
      const base = `${c.prefix}-${kind}-${cw}`;
      const svg = logoSvg(L, colors);
      fs.writeFileSync(path.join(root, "vector/svg", `${base}.svg`), svg);
      const p = L.h * 0.2;
      const k = 520 / Math.max(L.w + 2 * p, L.h + 2 * p);
      await pdf(svg, path.join(root, "vector/pdf", `${base}.pdf`), (L.w + 2 * p) * k, (L.h + 2 * p) * k, base);
    }
    await png(logoSvg(L, c.colorways["full-color"], { pxLong: 3000, bg: null }), path.join(root, "png/transparent", `${c.prefix}-${kind}-full-color.png`));
    await png(logoSvg(L, c.colorways["full-color"], { pxLong: 3000, bg: "#FFFFFF" }), path.join(root, "png/white-background", `${c.prefix}-${kind}-full-color-white-bg.png`));
    await png(logoSvg(L, c.colorways.black, { pxLong: 3000, bg: null }), path.join(root, "png/black", `${c.prefix}-${kind}-black.png`));
    await png(logoSvg(L, c.colorways.white, { pxLong: 3000, bg: null }), path.join(root, "png/white", `${c.prefix}-${kind}-white.png`));
    await sharp(Buffer.from(logoSvg(L, c.colorways["full-color"], { pxLong: 2400, bg: "#FFFFFF" })), { density: 72 })
      .flatten({ background: "#FFFFFF" })
      .jpeg({ quality: 92 })
      .toFile(path.join(root, "jpg", `${c.prefix}-${kind}-preview.jpg`));
  }
  const layersA = await psd(c.lockup(c.primaryKind), c.colorways["full-color"], c.psdLayers, path.join(root, "psd", `${c.prefix}-${c.primaryKind}-layered.psd`));
  if (c.primaryKind !== "horizontal") await psd(c.lockup("horizontal"), c.colorways["full-color"], c.psdLayers, path.join(root, "psd", `${c.prefix}-horizontal-layered.psd`));
  const b = board(c);
  fs.writeFileSync(path.join(root, "presentation", `${c.prefix}-presentation-board.svg`), b);
  await png(b, path.join(root, "presentation", `${c.prefix}-presentation-board.png`));
  await pdf(b, path.join(root, "presentation", `${c.prefix}-presentation-board.pdf`), BW * 0.36, BH * 0.36, `${c.letter} presentation board`);
  await sharp(Buffer.from(b), { density: 72 }).resize(1600).jpeg({ quality: 88 }).toFile(path.join(root, "jpg", `${c.prefix}-presentation-board-preview.jpg`));
  return layersA;
}

/* ───────────────────────────── Concept definitions ───────────────────────────── */
const SG_CONTACTS = ["763-400-1411", "info@sanyagold.com", "www.sanyagold.com"];
const WO_CONTACTS = ["[Phone]", "[Email]", "[Website]"];

const concepts = [
  {
    folder: "Sanyagold/Concept-A-Abstract-Wordmark",
    prefix: "sanyagold-concept-a",
    client: "Sanyagold Accounting, Advisory and Consulting Services",
    letter: "CONCEPT A",
    title: "Geometric symbol + wordmark",
    lockup: sgLockupA,
    primaryKind: "horizontal",
    symbolLabel: "SYMBOL ONLY",
    colorways: {
      "full-color": { bg: null, primary: "#0E4A3B", accent: "#C5A15A", word: "#0E4A3B", desc: "#0E4A3B", rule: "#C5A15A" },
      reversed: { bg: "#0E4A3B", primary: "#F2F1EC", accent: "#C5A15A", word: "#F2F1EC", desc: "#F2F1EC", rule: "#C5A15A" },
      black: { bg: null, ...mono("#000000", R_A) },
      white: { bg: null, ...mono("#FFFFFF", R_A) },
      grayscale: { bg: null, primary: "#262626", accent: "#8F8F8F", word: "#262626", desc: "#262626", rule: "#8F8F8F" },
    },
    palette: [
      { name: "Evergreen", hex: "#0E4A3B", use: "Primary · symbol, wordmark, dark backgrounds" },
      { name: "Champagne Gold", hex: "#C5A15A", use: "Accent · the golden line, divider" },
      { name: "Paper White", hex: "#F2F1EC", use: "Backgrounds · reversed artwork" },
      { name: "Ink", hex: "#1F1F1F", use: "Body text · grayscale" },
    ],
    ink: "#0E4A3B",
    dark: "#0E4A3B",
    paper: "#F2F1EC",
    mockBg: "#E5E6DF",
    ruleColor: "#C5A15A",
    accentText: "#8F7238",
    accentOnDark: "#C5A15A",
    contacts: SG_CONTACTS,
    heroLines: ["Accounting, advisory", "& consulting"],
    psdLayers: [
      ["Symbol – Evergreen strokes", ["primary"]],
      ["Symbol – The golden line", ["accent"]],
      ["Divider", ["rule"]],
      ["Wordmark – SANYAGOLD", ["word"]],
      ["Descriptor", ["desc"]],
    ],
    type: [
      { sample: "SANYAGOLD", f: F.ebg500, sampleSize: 58, tracking: 0.2, name: "EB Garamond Medium", role: "Wordmark, tracking +200", gap: 130 },
      { sample: "ACCOUNTING, ADVISORY AND CONSULTING", f: F.mont500, sampleSize: 20, tracking: 0.28, name: "Montserrat Medium", role: "Descriptor, tracking +280", gap: 110 },
      { sample: "Garamond for headings and documents", f: F.ebg400, sampleSize: 30, name: "EB Garamond Regular", role: "Stationery & documents", gap: 110 },
    ],
    typeNote: "All logo lettering is converted to outlines. EB Garamond and Montserrat are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Golden Line",
    concept:
      "A monoline S drawn on a strict square grid with a single, consistent stroke weight. Every proportion is fixed to the grid, the outer terminals are cut at a precise 45° and the form is perfectly point-symmetric, giving a sense of order, accuracy and balance. Measured gaps separate the strokes like the clean break between accounts that still reconcile. Through the centre runs the golden line, set in champagne gold: the connecting thread across bookkeeping, payroll, HR and advisory. Paired with spaced Garamond capitals in deep evergreen, the identity feels established, calm and quietly confident.",
  },
  {
    folder: "Sanyagold/Concept-B-Premium-Lettermark",
    prefix: "sanyagold-concept-b",
    client: "Sanyagold Accounting, Advisory and Consulting Services",
    letter: "CONCEPT B",
    title: "Premium typographic identity / lettermark",
    lockup: sgLockupB,
    primaryKind: "stacked",
    symbolLabel: "LETTERMARK ONLY",
    colorways: {
      "full-color": { bg: null, frame: "#B08D57", mono: "#1E2023", word: "#1E2023", accent: "#B08D57", desc: "#1E2023", rule: "#B08D57", ring: "#1E2023" },
      reversed: { bg: "#1E2023", frame: "#B08D57", mono: "#F4EFE6", word: "#F4EFE6", accent: "#B08D57", desc: "#F4EFE6", rule: "#B08D57", ring: "#F4EFE6" },
      black: { bg: null, ...mono("#000000", R_B) },
      white: { bg: null, ...mono("#FFFFFF", R_B) },
      grayscale: { bg: null, frame: "#8A857D", mono: "#222222", word: "#222222", accent: "#8A857D", desc: "#222222", rule: "#8A857D", ring: "#222222" },
    },
    palette: [
      { name: "Charcoal", hex: "#1E2023", use: "Primary · lettermark and wordmark" },
      { name: "Champagne", hex: "#B08D57", use: "Accent · hallmark frame, octagonal O, rule" },
      { name: "Warm Stone", hex: "#ECE6DC", use: "Backgrounds · stationery" },
      { name: "Warm Grey", hex: "#8A857D", use: "Secondary text · grayscale" },
    ],
    ink: "#1E2023",
    dark: "#1E2023",
    paper: "#F4F0E9",
    mockBg: "#E9E2D6",
    ruleColor: "#B08D57",
    accentText: "#8C6D3D",
    accentOnDark: "#C9A86F",
    contacts: SG_CONTACTS,
    heroLines: ["Accounting, advisory", "& consulting"],
    psdLayers: [
      ["Hallmark frame", ["frame"]],
      ["Lettermark – SG", ["mono"]],
      ["Wordmark – SANYAGOLD", ["word"]],
      ["Octagonal O (accent)", ["accent"]],
      ["Rule & divider", ["rule"]],
      ["Descriptor", ["desc"]],
    ],
    type: [
      { sample: "SANYAGOLD", f: F.corm600, sampleSize: 60, tracking: 0.2, name: "Cormorant Garamond SemiBold", role: "Wordmark, tracking +200", gap: 130 },
      { sample: "SG", f: F.corm700, sampleSize: 60, name: "Cormorant Garamond Bold", role: "Lettermark", gap: 110 },
      { sample: "ACCOUNTING, ADVISORY AND CONSULTING", f: F.mont500, sampleSize: 22, tracking: 0.3, name: "Montserrat Medium", role: "Descriptor, tracking +300", gap: 100 },
    ],
    typeNote: "The O in the wordmark is a custom octagonal letterform. Lettering is outlined; fonts are open-source (SIL OFL).",
    conceptTitle: "The Hallmark",
    concept:
      "A hallmark is the mark stamped on genuine gold to certify its quality, a fitting metaphor for a firm whose work is built on accuracy and trust. The SG lettermark sits inside a chamfered octagonal cartouche drawn with a strong outer line and a fine inner line, recalling a traditional assay punch. The same octagon replaces the O in the wordmark and is set in champagne, carrying one distinctive, ownable detail into the name itself. Classical capitals with generous spacing, a fine rule and a restrained palette convey an established, considered professional practice.",
  },
  {
    folder: "W-O-Oyebamiji-CPA/Concept-A-Abstract-Wordmark",
    prefix: "wo-oyebamiji-cpa-concept-a",
    client: "W O Oyebamiji CPA LLC",
    letter: "CONCEPT A",
    title: "Geometric symbol + wordmark",
    lockup: woLockupA,
    primaryKind: "horizontal",
    symbolLabel: "SYMBOL ONLY",
    colorways: {
      "full-color": { bg: null, primary: "#14233D", accent: "#B8925A", word: "#14233D", desc: "#14233D", rule: "#B8925A" },
      reversed: { bg: "#14233D", primary: "#F1F3F6", accent: "#C9A46A", word: "#F1F3F6", desc: "#F1F3F6", rule: "#C9A46A" },
      black: { bg: null, ...mono("#000000", R_A) },
      white: { bg: null, ...mono("#FFFFFF", R_A) },
      grayscale: { bg: null, primary: "#262626", accent: "#8F8F8F", word: "#262626", desc: "#262626", rule: "#8F8F8F" },
    },
    palette: [
      { name: "Navy", hex: "#14233D", use: "Primary · navy square, wordmark, dark backgrounds" },
      { name: "Brass", hex: "#B8925A", use: "Accent · brass square, divider" },
      { name: "Mist", hex: "#E9EDF2", use: "Backgrounds · stationery" },
      { name: "Slate", hex: "#5E6B7D", use: "Secondary text" },
    ],
    ink: "#14233D",
    dark: "#14233D",
    paper: "#F1F3F6",
    mockBg: "#E2E7ED",
    ruleColor: "#B8925A",
    accentText: "#8C6B37",
    accentOnDark: "#C9A46A",
    contacts: WO_CONTACTS,
    heroLines: ["Tax, audit", "& attestation"],
    psdLayers: [
      ["Symbol – Navy square (records)", ["primary"]],
      ["Symbol – Brass square (review)", ["accent"]],
      ["Divider", ["rule"]],
      ["Wordmark – W O OYEBAMIJI", ["word"]],
      ["Descriptor – CPA LLC", ["desc"]],
    ],
    type: [
      { sample: "W O OYEBAMIJI", f: F.man700, sampleSize: 54, tracking: 0.12, name: "Manrope Bold", role: "Wordmark, tracking +120", gap: 130 },
      { sample: "CPA LLC", f: F.man600, sampleSize: 24, tracking: 0.6, name: "Manrope SemiBold", role: "Descriptor, tracking +600", gap: 110 },
      { sample: "Clear, precise supporting text", f: F.mont500, sampleSize: 28, name: "Montserrat", role: "Stationery & documents", gap: 110 },
    ],
    typeNote: "All logo lettering is converted to outlines. Manrope and Montserrat are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Interlock",
    concept:
      "Two monoline squares drawn on one strict grid with a single stroke weight: one in navy for the client’s records, one in brass for independent review. Offset and woven together, the navy square passes over the brass at the first crossing and under it at the second, with a precise gap at each crossing. Neither square can be pulled away without the other, which is the essence of assurance: your records and an independent, professional review locked together into one trustworthy whole. Exact geometry and a clean sans-serif wordmark keep the identity modern, rigorous and highly legible.",
  },
  {
    folder: "W-O-Oyebamiji-CPA/Concept-B-Premium-Lettermark",
    prefix: "wo-oyebamiji-cpa-concept-b",
    client: "W O Oyebamiji CPA LLC",
    letter: "CONCEPT B",
    title: "Premium seal / lettermark",
    lockup: woLockupB,
    primaryKind: "stacked",
    symbolLabel: "SEAL ONLY",
    colorways: {
      "full-color": { bg: null, frame: "#A9864F", mono: "#5B1F2A", word: "#5B1F2A", accent: "#A9864F", desc: "#5B1F2A", rule: "#A9864F", ring: "#5B1F2A" },
      reversed: { bg: "#5B1F2A", frame: "#C9A46A", mono: "#F3EEE4", word: "#F3EEE4", accent: "#C9A46A", desc: "#F3EEE4", rule: "#C9A46A", ring: "#F3EEE4" },
      black: { bg: null, ...mono("#000000", R_B) },
      white: { bg: null, ...mono("#FFFFFF", R_B) },
      grayscale: { bg: null, frame: "#8A8A8A", mono: "#262626", word: "#262626", accent: "#8A8A8A", desc: "#262626", rule: "#8A8A8A", ring: "#262626" },
    },
    palette: [
      { name: "Oxblood", hex: "#5B1F2A", use: "Primary · monogram, name, dark backgrounds" },
      { name: "Antique Brass", hex: "#A9864F", use: "Accent · seal rings, rule" },
      { name: "Parchment", hex: "#F3EEE4", use: "Backgrounds · stationery" },
      { name: "Charcoal", hex: "#232323", use: "Body text · grayscale" },
    ],
    ink: "#5B1F2A",
    dark: "#5B1F2A",
    paper: "#F3EEE4",
    mockBg: "#E8E0D2",
    ruleColor: "#A9864F",
    accentText: "#8A6A36",
    accentOnDark: "#C9A46A",
    contacts: WO_CONTACTS,
    heroLines: ["Tax, audit", "& attestation"],
    psdLayers: [
      ["Seal rings", ["frame"]],
      ["Seal lettering", ["ring"]],
      ["Monogram – WO", ["mono"]],
      ["Name – W O OYEBAMIJI", ["word"]],
      ["Rule & divider", ["rule"]],
      ["Descriptor – CPA LLC", ["desc"]],
    ],
    type: [
      { sample: "W O OYEBAMIJI", f: F.pf600, sampleSize: 54, tracking: 0.1, name: "Playfair Display SemiBold", role: "Name, tracking +100", gap: 130 },
      { sample: "WO", f: F.pf700, sampleSize: 58, name: "Playfair Display Bold", role: "Seal monogram", gap: 110 },
      { sample: "CPA LLC  ·  SEAL LETTERING", f: F.man600, sampleSize: 22, tracking: 0.5, name: "Manrope SemiBold", role: "Descriptor & seal text", gap: 100 },
    ],
    typeNote: "Seal lettering is set on a true circle and outlined. Fonts are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Seal",
    concept:
      "For a licensed CPA firm, a seal carries exactly the right message: an official mark of review, verification and professional responsibility. The WO monogram, in a high-contrast classical serif, sits at the centre of a precisely drawn double ring with the firm's full name set around it on a true circle. Oxblood and antique brass give the identity the weight of an established practice, while the generous spacing and fine rules keep it refined rather than ornamental. The seal works on its own as a stamp of approval on reports, engagement letters and certificates.",
  },
];

fs.mkdirSync(OUT, { recursive: true });
for (const c of concepts) {
  const layers = await buildConcept(c);
  console.log(`${c.folder}: PSD layers -> ${layers.join(" | ")}`);
}
