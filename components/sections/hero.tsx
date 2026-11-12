"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarCheck, CheckCircle2, FileCheck2, MapPin } from "lucide-react";
import { FirmMark } from "@/components/firms/firm-mark";
import { LogoMark } from "@/components/layout/logo";
import { CtaButtons } from "@/components/shared";
import { displayName, firmHref, firms } from "@/content/firms";

const headline = [
  "Accounting, tax and advisory",
  "that helps Minnesota nonprofits",
  "and small businesses grow with confidence.",
];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const item = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.01 : 0.55, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      <HeroBackdrop />

      <div className="container-page grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20 lg:pb-28">
        <div>
          <motion.p
            {...item(0)}
            className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <MapPin className="size-3.5 text-gold-ink" aria-hidden="true" />
            Two independent Minnesota firms · Nonprofits &amp; small businesses
          </motion.p>

          <h1 id="hero-title" className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.6rem]">
            {headline.map((line, index) => (
              <motion.span key={line} {...item(0.08 + index * 0.1)} className="block">
                {index === 2 ? (
                  <>
                    and small businesses{" "}
                    <span className="relative sm:whitespace-nowrap">
                      <span className="relative z-10">grow with confidence.</span>
                      <motion.span
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.7, ease }}
                        className="absolute inset-x-0 bottom-1 -z-0 h-3 origin-left rounded-sm bg-accent/45 sm:bottom-2"
                      />
                    </span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p {...item(0.42)} className="text-lead mt-6 max-w-xl">
            Two independent, complementary firms, one place to start. Work with either firm on its own, or with both
            together.
          </motion.p>

          {/* The two firms, side by side: each stands on its own and links to its own page. */}
          <motion.ul {...item(0.48)} className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2" aria-label="Our two firms">
            {firms.map((firm) => (
              <li key={firm.id}>
                <Link
                  href={firmHref(firm.id)}
                  className="group flex h-full items-start gap-3 rounded-2xl border bg-card/80 p-3.5 backdrop-blur transition-[border-color,box-shadow] hover:border-accent hover:shadow-md"
                >
                  <FirmMark firm={firm.id} className="mt-0.5 h-8" />
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug font-semibold">{displayName(firm)}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground first-letter:uppercase">
                      {firm.focus}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            ))}
          </motion.ul>

          <motion.div {...item(0.55)}>
            <CtaButtons className="mt-9" />
          </motion.div>

          <motion.ul {...item(0.65)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Free first consultation", "Clear, fixed-fee pricing", "Secure document upload"].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="bg-grain absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />
      <div className="absolute -top-40 -left-32 size-[34rem] animate-gradient rounded-full bg-accent/30 blur-3xl dark:bg-accent/12" />
      <div className="absolute top-20 -right-40 size-[30rem] animate-gradient rounded-full bg-sg-ink/15 blur-3xl [animation-delay:-6s]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

/** Abstract product-style visual — swap for a real team/office photo when available. */
function HeroVisual() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const cards = [
    { icon: FileCheck2, title: "Form 990 filed", meta: "Nonprofit · on time", className: "top-6 -left-4 sm:-left-10" },
    {
      icon: CalendarCheck,
      title: "Q3 estimates scheduled",
      meta: "Small business",
      className: "bottom-24 -right-2 sm:-right-8",
    },
    { icon: CheckCircle2, title: "Books Closed for the Period", meta: "Monthly close", className: "-bottom-4 left-6" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : 0.2, ease }}
        className="absolute inset-8 grid place-items-center rounded-[2.5rem] border bg-card/80 shadow-[0_30px_80px_-30px_rgba(15,27,45,0.35)] backdrop-blur"
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-transparent to-transparent" />
          <svg className="absolute inset-0 size-full text-border" viewBox="0 0 400 400" fill="none">
            {[60, 110, 160].map((r) => (
              <polygon
                key={r}
                points={hexPoints(200, 200, r)}
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 6"
              />
            ))}
          </svg>
        </div>
        <div className="relative animate-float">
          <LogoMark className="h-32 drop-shadow-[0_14px_24px_rgba(14,74,59,0.28)] sm:h-36" />
        </div>
      </motion.div>

      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.5, delay: reduce ? 0 : 0.6 + index * 0.15, ease }}
          className={`absolute flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-lg ${card.className}`}
        >
          <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-gold-ink">
            <card.icon className="size-4.5" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-medium">{card.title}</span>
            <span className="block text-xs text-muted-foreground">{card.meta}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(" ");
}
