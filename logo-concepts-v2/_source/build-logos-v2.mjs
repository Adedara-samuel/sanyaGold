/**
 * Logo concepts v2 generator (emblem directions): two concepts each for
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
      if (e.stroke) return `<path d="${e.d}" fill="none" stroke="${colors[e.role]}" stroke-width="${e.stroke}" stroke-linejoin="miter" stroke-miterlimit="10"${tr}/>`;
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


/* ═════════════════════════ v2 emblem marks ═════════════════════════ */

/** Annular segment between radii R and r from angle a0 to a1 (degrees, screen orientation, ≤ 90°). */
function annular(cx, cy, R, r, a0, a1) {
  const p = (deg, rad) => {
    const t = (deg * Math.PI) / 180;
    return `${n(cx + rad * Math.cos(t))} ${n(cy + rad * Math.sin(t))}`;
  };
  return `M${p(a0, R)}A${n(R)} ${n(R)} 0 0 1 ${p(a1, R)}L${p(a1, r)}A${n(r)} ${n(r)} 0 0 0 ${p(a0, r)}Z`;
}
/** Annular arc of any sweep, split into ≤ 90° pieces. */
function arcBand(cx, cy, R, r, a0, a1) {
  const pieces = Math.max(1, Math.ceil((a1 - a0) / 90));
  const out = [];
  for (let k = 0; k < pieces; k++) out.push(annular(cx, cy, R, r, a0 + ((a1 - a0) * k) / pieces, a0 + ((a1 - a0) * (k + 1)) / pieces));
  return out;
}
/** Inset a convex polygon by d (all edges move inward). */
function insetConvex(pts, d) {
  const area = pts.reduce((s, [x, y], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length];
    return s + x * y2 - x2 * y;
  }, 0);
  const sign = area > 0 ? 1 : -1;
  const lines = pts.map(([x1, y1], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const nx = (-(y2 - y1) / len) * sign;
    const ny = ((x2 - x1) / len) * sign;
    return [x1 + nx * d, y1 + ny * d, x2 + nx * d, y2 + ny * d];
  });
  return lines.map((L1, i) => {
    const L0 = lines[(i - 1 + lines.length) % lines.length];
    const [a1, b1, a2, b2] = L0;
    const [c1, d1, c2, d2] = L1;
    const den = (a1 - a2) * (d1 - d2) - (b1 - b2) * (c1 - c2);
    const t = ((a1 - c1) * (d1 - d2) - (b1 - d1) * (c1 - c2)) / den;
    return [a1 + t * (a2 - a1), b1 + t * (b2 - b1)];
  });
}
/** Text set along an arc. mode "top": reads clockwise over the top. mode "bottom": reads left→right along the bottom, upright. */
function arcText(f, str, cx, cy, r, cap, mode, tracking = 0, maxDeg = 140) {
  let size = capSize(f, cap);
  {
    const gl = f.stringToGlyphs(str);
    const len = (sz) => gl.reduce((a, g) => a + (g.advanceWidth * sz) / f.unitsPerEm, 0) + tracking * sz * (gl.length - 1);
    const maxLen = (r * maxDeg * Math.PI) / 180;
    if (len(size) > maxLen) size *= maxLen / len(size);
  }
  const glyphs = f.stringToGlyphs(str);
  const sc = size / f.unitsPerEm;
  const adv = glyphs.map((g) => g.advanceWidth * sc);
  const track = tracking * size;
  const total = adv.reduce((a, b) => a + b, 0) + track * (glyphs.length - 1);
  let s = 0;
  let d = "";
  glyphs.forEach((g, i) => {
    const mid = s + adv[i] / 2 - total / 2; // arc offset of glyph centre from the text centre
    const p = g.getPath(-adv[i] / 2, 0, size);
    if (mode === "top") {
      const ang = (mid / r) * (180 / Math.PI); // clockwise from top
      const rad = ((ang - 90) * Math.PI) / 180;
      d += transformPath(p, ang, cx + r * Math.cos(rad), cy + r * Math.sin(rad));
    } else {
      const ang = 180 - (mid / r) * (180 / Math.PI); // runs counter-clockwise along the bottom
      const rad = ((ang - 90) * Math.PI) / 180;
      d += transformPath(p, ang - 180, cx + r * Math.cos(rad), cy + r * Math.sin(rad));
    }
    s += adv[i] + track;
  });
  return d;
}

/* ───────────── SANYAGOLD v2 · A — The Six-Facet Gold ───────────── */
function sgGem() {
  const R = 50;
  const r = 21; // table (centre) radius
  const g = 1.5; // half the gap between facets
  const cx = R * Math.cos(Math.PI / 6);
  const cy = R;
  const V = (rad, k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const els = [];
  // Light comes from the upper left: facet tone follows its outward direction.
  const toneFor = (k) => {
    const dir = -60 + 60 * k; // outward direction of facet k (screen degrees)
    const light = Math.cos(((dir + 135) * Math.PI) / 180); // 1 = facing the light
    return light > 0.5 ? "f1" : light > -0.5 ? "f2" : "f3";
  };
  for (let k = 0; k < 6; k++) {
    const quad = [V(R, k), V(R, k + 1), V(r, k + 1), V(r, k)];
    els.push({ d: polyD(insetConvex(quad, g)), role: toneFor(k) });
  }
  const table = Array.from({ length: 6 }, (_, k) => V(r, k));
  els.push({ d: polyD(insetConvex(table, g)), role: "table" });
  // Fine star facets inside the table: a smaller inverted hexagon highlight.
  const inner = Array.from({ length: 6 }, (_, k) => V(r * 0.42, k));
  els.push({ d: polyD(inner), role: "spark" });
  return { w: 2 * cx, h: 2 * R, els };
}

/* ───────────── SANYAGOLD v2 · B — The Ledger S ───────────── */
function sgLedger() {
  const R = 50;
  const ring = 2.6;
  const inR = 44.5; // stripes live inside this radius
  const a = 17; // S: radius of each bowl's centre line
  const t = 10.5; // S band weight
  const pad = 2.6; // clearance between S and stripes
  const c = R;
  const els = [{ d: ringD(c, c, R, ring), role: "ring", evenodd: true }];
  // Gold S: upper bowl (centre c, c-a) sweeps 90°→340°; lower bowl (centre c, c+a) sweeps -90°→160°.
  for (const d of arcBand(c, c - a, a + t / 2, a - t / 2, 90, 340)) els.push({ d, role: "s" });
  for (const d of arcBand(c, c + a, a + t / 2, a - t / 2, -90, 160)) els.push({ d, role: "s" });
  const inBand = (x, y, cyy, a0, a1, extra) => {
    const dx = x - c;
    const dy = y - cyy;
    const rr = Math.hypot(dx, dy);
    if (Math.abs(rr - a) > t / 2 + extra) return false;
    let ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const ext = ((extra / a) * 180) / Math.PI;
    for (const k of [-360, 0, 360]) if (ang + k >= a0 - ext && ang + k <= a1 + ext) return true;
    return false;
  };
  const covered = (x, y) => inBand(x, y, c - a, 90, 340, pad) || inBand(x, y, c + a, -90, 160, pad);
  // Ledger stripes
  const N = 15;
  const pitch = (2 * inR) / N;
  const h = pitch * 0.55;
  for (let i = 0; i < N; i++) {
    const yc = c - inR + pitch * (i + 0.5);
    const y0 = yc - h / 2;
    const half = Math.sqrt(Math.max(0, inR * inR - (Math.abs(yc - c) + h / 2) ** 2));
    if (half < 3) continue;
    const step = 0.05;
    let start = null;
    for (let x = c - half; x <= c + half + step; x += step) {
      const free = x <= c + half && ![y0, yc, y0 + h, y0 + h * 0.25, y0 + h * 0.75].some((y) => covered(x, y));
      if (free && start === null) start = x;
      if (!free && start !== null) {
        if (x - start > 1.2) els.push({ d: rectD(start, y0, x - start, h), role: "stripe" });
        start = null;
      }
    }
  }
  return { w: 2 * R, h: 2 * R, els };
}

/* ───────────── W O OYEBAMIJI v2 · A — The Assurance Crest ───────────── */
function woCrest() {
  const W = 84;
  const H = 100;
  const hw = W / 2;
  // Heater shield: straight sides to 52%, then a curved point.
  const shield = (s) => {
    const x0 = hw - hw * s;
    const x1 = hw + hw * s;
    const y0 = (1 - s) * 6;
    const ys = y0 + H * 0.5 * s;
    const yb = H - (1 - s) * 12;
    return `M${n(x0)} ${n(y0)}H${n(x1)}V${n(ys)}C${n(x1)} ${n(ys + H * 0.26 * s)} ${n(hw + hw * 0.5 * s)} ${n(yb - H * 0.08 * s)} ${n(hw)} ${n(yb)}C${n(hw - hw * 0.5 * s)} ${n(yb - H * 0.08 * s)} ${n(x0)} ${n(ys + H * 0.26 * s)} ${n(x0)} ${n(ys)}Z`;
  };
  const els = [
    { d: shield(1), role: "frame", stroke: 3.4 },
    { d: shield(0.86), role: "frame", stroke: 0.9 },
  ];
  // Monogram: a geometric W (four flat-cut strokes) and a brass O, equal height and matching weight.
  const mh = 25; // letter height
  const sw = 5.6; // stroke weight
  const mw = 29; // W width (centre lines)
  const oD = mh; // O diameter
  const gapWO = 4.5;
  const total = mw + sw + gapWO + oD;
  const left = hw - total / 2 + sw / 2;
  const top = 24;
  const xs = [0, 0.25, 0.5, 0.75, 1].map((f) => left + f * mw);
  const strokes = [
    [xs[0], xs[1]],
    [xs[2], xs[1]],
    [xs[2], xs[3]],
    [xs[4], xs[3]],
  ];
  for (const [xa, xb] of strokes) {
    els.push({ d: polyD([[xa - sw / 2, top], [xa + sw / 2, top], [xb + sw / 2, top + mh], [xb - sw / 2, top + mh]]), role: "mono" });
  }
  const oR = oD / 2;
  els.push({ d: ringD(xs[4] + sw / 2 + gapWO + oR, top + oR, oR, sw * 0.92), role: "accent", evenodd: true });
  // CPA beneath, on a fine brass rule
  const cpa = inkText(F.man700, "CPA", capSize(F.man700, 6.4), 0.45);
  const ruleY = top + mh + 8.5;
  els.push({ d: rectD(hw - 11, ruleY, 22, 0.7), role: "accent" });
  els.push({ d: cpa.d, role: "cpa", t: [hw - cpa.w / 2, ruleY + 5, 1] });
  return { w: W, h: H, els };
}

/* ───────────── W O OYEBAMIJI v2 · B — The Practice Seal ───────────── */
function woSeal() {
  const R = 50;
  const c = R;
  const els = [
    { d: ringD(c, c, R, 3), role: "frame", evenodd: true },
    { d: ringD(c, c, R - 5, 0.8), role: "frame", evenodd: true },
    { d: ringD(c, c, R - 20.5, 0.8), role: "frame", evenodd: true },
    { d: ringD(c, c, R - 23, 2.2), role: "frame", evenodd: true },
  ];
  const cap = 6.1;
  els.push({ d: arcText(F.man700, "W O OYEBAMIJI CPA LLC", c, c, 34.2, cap, "top", 0.14, 132), role: "ring" });
  els.push({ d: arcText(F.man700, "TAX · AUDIT · ATTESTATION", c, c, 39.2, cap, "bottom", 0.12, 132), role: "ring" });
  // Brass separators at 9 and 3 o'clock
  els.push({ d: diamondD(c - 37.3, c, 2.1), role: "accent" });
  els.push({ d: diamondD(c + 37.3, c, 2.1), role: "accent" });
  // Centre: WO monogram over a rule and CPA
  const mono = inkText(F.corm700, "WO", capSize(F.corm700, 15.5), -0.01);
  els.push({ d: mono.d, role: "mono", t: [c - mono.w / 2, c - 11.5, 1] });
  els.push({ d: rectD(c - 10, c + 7.3, 20, 0.7), role: "accent" });
  const cpa = inkText(F.man700, "CPA", capSize(F.man700, 4.2), 0.5);
  els.push({ d: cpa.d, role: "mono", t: [c - cpa.w / 2, c + 10.6, 1] });
  return { w: 2 * R, h: 2 * R, els };
}

/* ───────────── Text blocks with optional tagline ───────────── */
function textBlock3({ wf, word, cap, wTrack, df, desc, dTrack, dFit, dCap, gap, tf, tag, tTrack, tCap, tGap, align = "start" }) {
  const base = textBlock({ wf, word, cap, wTrack, df, desc, dTrack, dFit, dCap, gap, align });
  if (!tag) return base;
  const t = inkText(tf, tag, capSize(tf, tCap), tTrack);
  const W = Math.max(base.w, t.w);
  const dx = align === "center" ? (W - base.w) / 2 : 0;
  const tx = align === "center" ? (W - t.w) / 2 : 0;
  return { w: W, h: base.h + tGap + t.h, els: [...shift(base.els, dx, 0), { d: t.d, role: "tag", t: [tx, base.h + tGap, 1] }] };
}

const SG_DESC2 = "ACCOUNTING, ADVISORY AND CONSULTING SERVICES";
const SG_TAG2 = "BOOKKEEPING · PAYROLL · HR · BUSINESS ADVISORY";

function sgText2A(align) {
  return textBlock3({ wf: F.ebg500, word: "SANYAGOLD", cap: 30, wTrack: 0.2, df: F.mont500, desc: SG_DESC2, dTrack: 0.28, gap: 14, tf: F.mont500, tag: SG_TAG2, tTrack: 0.22, tCap: 5.2, tGap: 11, align });
}
function sgText2B(align) {
  return textBlock3({ wf: F.jost500, word: "SANYAGOLD", cap: 30, wTrack: 0.16, df: F.jost400, desc: SG_DESC2, dTrack: 0.21, gap: 14, tf: F.jost400, tag: SG_TAG2, tTrack: 0.2, tCap: 5.2, tGap: 11, align });
}
function woText2A(align) {
  return textBlock3({ wf: F.pf600, word: "W O OYEBAMIJI", cap: 28, wTrack: 0.1, df: F.man600, desc: "CPA LLC", dTrack: 0.62, dFit: false, dCap: 10.5, gap: 13, tf: F.man500, tag: "TAX  ·  AUDIT  ·  ATTESTATION", tTrack: 0.3, tCap: 6, tGap: 11, align });
}
function woText2B(align) {
  return textBlock3({ wf: F.corm700, word: "W O OYEBAMIJI", cap: 30, wTrack: 0.1, df: F.man600, desc: "CPA LLC", dTrack: 0.62, dFit: false, dCap: 10.5, gap: 14, tf: F.man500, tag: "TAX  ·  AUDIT  ·  ATTESTATION", tTrack: 0.3, tCap: 6, tGap: 11, align });
}

const lockupFor = (mark, textFn, { gap = 34, divider = true, stackGap = 34, stackScale = 1 } = {}) => (kind) => {
  const m = mark();
  if (kind === "symbol") return m;
  if (kind === "wordmark") return textFn("start");
  if (kind === "horizontal") return horizontal(m, textFn("start"), gap, divider ? { w: 1, h: 0.62, role: "rule" } : null);
  return stacked(m, textFn("center"), stackGap, stackScale);
};

/* ═════════════════════════ v2 concept definitions ═════════════════════════ */
const SG_CONTACTS = ["763-400-1411", "info@sanyagold.com", "www.sanyagold.com"];
const WO_CONTACTS = ["[Phone]", "[Email]", "[Website]"];
const allRoles = (hex, roles) => Object.fromEntries(roles.map((r) => [r, hex]));

const ROLES_GEM = ["table", "spark", "f1", "f2", "f3", "word", "desc", "tag", "rule"];
const ROLES_LEDGER = ["ring", "stripe", "s", "word", "desc", "tag", "rule"];
const ROLES_CREST = ["frame", "mono", "accent", "cpa", "word", "desc", "tag", "rule"];
const ROLES_SEAL = ["frame", "ring", "mono", "accent", "word", "desc", "tag", "rule"];

const concepts = [
  {
    folder: "Sanyagold/Concept-A-Faceted-Emblem",
    prefix: "sanyagold-v2-concept-a",
    client: "Sanyagold Accounting, Advisory and Consulting Services",
    letter: "CONCEPT A",
    title: "Faceted emblem + wordmark",
    lockup: lockupFor(sgGem, sgText2A, { gap: 34, stackGap: 32, stackScale: 1 }),
    primaryKind: "horizontal",
    symbolLabel: "EMBLEM ONLY",
    colorways: {
      "full-color": { bg: null, table: "#0E4A3B", spark: "#C5A15A", f1: "#E2C98F", f2: "#C5A15A", f3: "#93723A", word: "#0E4A3B", desc: "#0E4A3B", tag: "#93723A", rule: "#C5A15A" },
      reversed: { bg: "#0E4A3B", table: "#F4F1EA", spark: "#C5A15A", f1: "#E2C98F", f2: "#C5A15A", f3: "#A8854A", word: "#F4F1EA", desc: "#F4F1EA", tag: "#E2C98F", rule: "#C5A15A" },
      black: { bg: null, ...allRoles("#000000", ROLES_GEM) },
      white: { bg: null, ...allRoles("#FFFFFF", ROLES_GEM) },
      grayscale: { bg: null, table: "#262626", spark: "#9A9A9A", f1: "#C9C9C9", f2: "#9A9A9A", f3: "#5E5E5E", word: "#262626", desc: "#262626", tag: "#5E5E5E", rule: "#9A9A9A" },
    },
    palette: [
      { name: "Evergreen", hex: "#0E4A3B", use: "Centre facet (the client) · wordmark · dark backgrounds" },
      { name: "Light Gold", hex: "#E2C98F", use: "Lit facets" },
      { name: "Champagne Gold", hex: "#C5A15A", use: "Mid facets · divider" },
      { name: "Deep Gold", hex: "#93723A", use: "Shadow facets · service line" },
    ],
    ink: "#0E4A3B",
    dark: "#0E4A3B",
    paper: "#F4F1EA",
    mockBg: "#E7E3D8",
    ruleColor: "#C5A15A",
    accentText: "#8A6C35",
    accentOnDark: "#E2C98F",
    contacts: SG_CONTACTS,
    heroLines: ["Accounting, advisory", "& consulting"],
    psdLayers: [
      ["Emblem – centre facet (evergreen)", ["table"]],
      ["Emblem – centre highlight", ["spark"]],
      ["Emblem – lit facets", ["f1"]],
      ["Emblem – mid facets", ["f2"]],
      ["Emblem – shadow facets", ["f3"]],
      ["Divider", ["rule"]],
      ["Wordmark – SANYAGOLD", ["word"]],
      ["Descriptor", ["desc"]],
      ["Service line", ["tag"]],
    ],
    type: [
      { sample: "SANYAGOLD", f: F.ebg500, sampleSize: 58, tracking: 0.2, name: "EB Garamond Medium", role: "Wordmark, tracking +200", gap: 125 },
      { sample: "ACCOUNTING, ADVISORY AND CONSULTING", f: F.mont500, sampleSize: 20, tracking: 0.28, name: "Montserrat Medium", role: "Descriptor & service line", gap: 105 },
      { sample: "Garamond for headings and documents", f: F.ebg400, sampleSize: 30, name: "EB Garamond Regular", role: "Stationery & documents", gap: 110 },
    ],
    typeNote: "All logo lettering is converted to outlines. EB Garamond and Montserrat are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Six-Facet Gold",
    concept:
      "A hexagonal cut of gold, seen from above. Its six crown facets stand for the firm's six disciplines: accounting, bookkeeping, payroll, HR, business advisory and consulting. All six meet at an evergreen centre, the client, at the heart of everything the firm does. Shaded in three golds like a real cut stone, the emblem speaks of value, precision and care, and its hexagon carries forward the shape of Sanyagold's existing mark so the brand evolves rather than starts over. The service line beneath the name says plainly what the firm does.",
  },
  {
    folder: "Sanyagold/Concept-B-Ledger-Emblem",
    prefix: "sanyagold-v2-concept-b",
    client: "Sanyagold Accounting, Advisory and Consulting Services",
    letter: "CONCEPT B",
    title: "Ledger emblem + wordmark",
    lockup: lockupFor(sgLedger, sgText2B, { gap: 34, stackGap: 32 }),
    primaryKind: "horizontal",
    symbolLabel: "EMBLEM ONLY",
    colorways: {
      "full-color": { bg: null, ring: "#0F3D31", stripe: "#0F3D31", s: "#C9A55E", word: "#0F3D31", desc: "#0F3D31", tag: "#9A7A3D", rule: "#C9A55E" },
      reversed: { bg: "#0F3D31", ring: "#F3F1EA", stripe: "#F3F1EA", s: "#D6B46C", word: "#F3F1EA", desc: "#F3F1EA", tag: "#D6B46C", rule: "#D6B46C" },
      black: { bg: null, ...allRoles("#000000", ROLES_LEDGER) },
      white: { bg: null, ...allRoles("#FFFFFF", ROLES_LEDGER) },
      grayscale: { bg: null, ring: "#262626", stripe: "#262626", s: "#9A9A9A", word: "#262626", desc: "#262626", tag: "#6A6A6A", rule: "#9A9A9A" },
    },
    palette: [
      { name: "Ledger Green", hex: "#0F3D31", use: "Ledger lines · ring · wordmark" },
      { name: "Gold", hex: "#C9A55E", use: "The S · divider" },
      { name: "Paper", hex: "#F3F1EA", use: "Backgrounds · reversed artwork" },
      { name: "Antique Gold", hex: "#9A7A3D", use: "Service line" },
    ],
    ink: "#0F3D31",
    dark: "#0F3D31",
    paper: "#F3F1EA",
    mockBg: "#E5E4DC",
    ruleColor: "#C9A55E",
    accentText: "#8A6C35",
    accentOnDark: "#D6B46C",
    contacts: SG_CONTACTS,
    heroLines: ["Accounting, advisory", "& consulting"],
    psdLayers: [
      ["Emblem – outer ring", ["ring"]],
      ["Emblem – ledger lines", ["stripe"]],
      ["Emblem – gold S", ["s"]],
      ["Divider", ["rule"]],
      ["Wordmark – SANYAGOLD", ["word"]],
      ["Descriptor", ["desc"]],
      ["Service line", ["tag"]],
    ],
    type: [
      { sample: "SANYAGOLD", f: F.jost500, sampleSize: 58, tracking: 0.16, name: "Jost Medium", role: "Wordmark, tracking +160", gap: 125 },
      { sample: "ACCOUNTING, ADVISORY AND CONSULTING", f: F.jost400, sampleSize: 22, tracking: 0.2, name: "Jost Regular", role: "Descriptor & service line", gap: 105 },
      { sample: "Clear, modern supporting text", f: F.mont500, sampleSize: 28, name: "Montserrat", role: "Stationery & documents", gap: 110 },
    ],
    typeNote: "All logo lettering is converted to outlines. Jost and Montserrat are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Ledger S",
    concept:
      "A circular emblem filled with fine, evenly spaced ledger lines: the organized records, reconciled accounts and dependable payroll at the core of Sanyagold's work. Running through them is a bold gold S, for Sanyagold and for the value and clarity the firm draws out of the numbers. The lines part precisely around the S, showing order and insight working together, and the fine outer ring frames a complete, trusted service. Modern, structured and confident, it reads clearly from a business card to a building sign.",
  },
  {
    folder: "W-O-Oyebamiji-CPA/Concept-A-Assurance-Crest",
    prefix: "wo-oyebamiji-cpa-v2-concept-a",
    client: "W O Oyebamiji CPA LLC",
    letter: "CONCEPT A",
    title: "Crest emblem + wordmark",
    lockup: lockupFor(woCrest, woText2A, { gap: 32, stackGap: 30 }),
    primaryKind: "horizontal",
    symbolLabel: "CREST ONLY",
    colorways: {
      "full-color": { bg: null, frame: "#14233D", mono: "#14233D", accent: "#B8925A", cpa: "#14233D", word: "#14233D", desc: "#14233D", tag: "#8C6B37", rule: "#B8925A" },
      reversed: { bg: "#14233D", frame: "#F1F3F6", mono: "#F1F3F6", accent: "#C9A46A", cpa: "#F1F3F6", word: "#F1F3F6", desc: "#F1F3F6", tag: "#C9A46A", rule: "#C9A46A" },
      black: { bg: null, ...allRoles("#000000", ROLES_CREST) },
      white: { bg: null, ...allRoles("#FFFFFF", ROLES_CREST) },
      grayscale: { bg: null, frame: "#262626", mono: "#262626", accent: "#8F8F8F", cpa: "#262626", word: "#262626", desc: "#262626", tag: "#5E5E5E", rule: "#8F8F8F" },
    },
    palette: [
      { name: "Navy", hex: "#14233D", use: "Shield · W · name · dark backgrounds" },
      { name: "Brass", hex: "#B8925A", use: "The O · rule · divider" },
      { name: "Mist", hex: "#EEF1F5", use: "Backgrounds · stationery" },
      { name: "Antique Brass", hex: "#8C6B37", use: "Service line" },
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
      ["Crest – shield keylines", ["frame"]],
      ["Crest – W", ["mono"]],
      ["Crest – brass O & rule", ["accent"]],
      ["Crest – CPA", ["cpa"]],
      ["Divider", ["rule"]],
      ["Name – W O OYEBAMIJI", ["word"]],
      ["Descriptor – CPA LLC", ["desc"]],
      ["Service line", ["tag"]],
    ],
    type: [
      { sample: "W O OYEBAMIJI", f: F.pf600, sampleSize: 54, tracking: 0.1, name: "Playfair Display SemiBold", role: "Name, tracking +100", gap: 125 },
      { sample: "CPA LLC", f: F.man600, sampleSize: 24, tracking: 0.6, name: "Manrope SemiBold", role: "Descriptor, tracking +620", gap: 105 },
      { sample: "TAX  ·  AUDIT  ·  ATTESTATION", f: F.man500, sampleSize: 22, tracking: 0.3, name: "Manrope Medium", role: "Service line", gap: 110 },
    ],
    typeNote: "Lettering is outlined. Playfair Display and Manrope are open-source (SIL OFL) and free for commercial use.",
    conceptTitle: "The Assurance Crest",
    concept:
      "A classic heater shield, drawn with a strong outer keyline and a fine inner keyline, stands for protection: compliance kept in order, filings defended, and clients represented with authority. Inside, the firm’s initials form a crest monogram: a precise geometric W in navy beside a perfect brass O, drawn at one height and one stroke weight so the two letters read as a single, balanced mark. CPA sits beneath on a fine brass rule. With the service line Tax · Audit · Attestation, the identity states exactly who the firm is and what it does.",
  },
  {
    folder: "W-O-Oyebamiji-CPA/Concept-B-Practice-Seal",
    prefix: "wo-oyebamiji-cpa-v2-concept-b",
    client: "W O Oyebamiji CPA LLC",
    letter: "CONCEPT B",
    title: "Practice seal + wordmark",
    lockup: lockupFor(woSeal, woText2B, { gap: 32, stackGap: 30, stackScale: 1.1 }),
    primaryKind: "stacked",
    symbolLabel: "SEAL ONLY",
    colorways: {
      "full-color": { bg: null, frame: "#A9864F", ring: "#5B1F2A", mono: "#5B1F2A", accent: "#A9864F", word: "#5B1F2A", desc: "#5B1F2A", tag: "#8A6A36", rule: "#A9864F" },
      reversed: { bg: "#5B1F2A", frame: "#C9A46A", ring: "#F3EEE4", mono: "#F3EEE4", accent: "#C9A46A", word: "#F3EEE4", desc: "#F3EEE4", tag: "#C9A46A", rule: "#C9A46A" },
      black: { bg: null, ...allRoles("#000000", ROLES_SEAL) },
      white: { bg: null, ...allRoles("#FFFFFF", ROLES_SEAL) },
      grayscale: { bg: null, frame: "#8A8A8A", ring: "#262626", mono: "#262626", accent: "#8A8A8A", word: "#262626", desc: "#262626", tag: "#5E5E5E", rule: "#8A8A8A" },
    },
    palette: [
      { name: "Oxblood", hex: "#5B1F2A", use: "Seal lettering · monogram · name" },
      { name: "Antique Brass", hex: "#A9864F", use: "Seal rings · separators · rule" },
      { name: "Parchment", hex: "#F3EEE4", use: "Backgrounds · stationery" },
      { name: "Deep Brass", hex: "#8A6A36", use: "Service line" },
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
      ["Seal – rings", ["frame"]],
      ["Seal – lettering", ["ring"]],
      ["Seal – WO monogram & CPA", ["mono"]],
      ["Seal – brass separators & rule", ["accent"]],
      ["Name – W O OYEBAMIJI", ["word"]],
      ["Rule & divider", ["rule"]],
      ["Descriptor – CPA LLC", ["desc"]],
      ["Service line", ["tag"]],
    ],
    type: [
      { sample: "W O OYEBAMIJI", f: F.corm700, sampleSize: 58, tracking: 0.1, name: "Cormorant Garamond Bold", role: "Name & monogram", gap: 125 },
      { sample: "TAX · AUDIT · ATTESTATION", f: F.man700, sampleSize: 22, tracking: 0.3, name: "Manrope Bold", role: "Seal lettering", gap: 105 },
      { sample: "CPA LLC", f: F.man600, sampleSize: 24, tracking: 0.6, name: "Manrope SemiBold", role: "Descriptor", gap: 110 },
    ],
    typeNote: "Seal lettering is set on true circles; the bottom arc reads upright. All lettering is outlined; fonts are open-source (SIL OFL).",
    conceptTitle: "The Practice Seal",
    concept:
      "A full professional seal that tells the firm's story at a glance. The name W O Oyebamiji CPA LLC runs around the top arc; Tax · Audit · Attestation reads upright along the bottom, naming the firm's core services; brass separators mark the balance between them. At the centre, the WO monogram sits over a fine rule and CPA, framed by a heavy outer ring and fine inner rings. In oxblood and antique brass, it carries the authority of an established, licensed practice and works as an official stamp on reports, certificates and engagement letters.",
  },
];

fs.mkdirSync(OUT, { recursive: true });
for (const c of concepts) {
  const layers = await buildConcept(c);
  console.log(`${c.folder}: PSD layers -> ${layers.join(" | ")}`);
}
