"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { applyServerIssues, HoneypotField } from "@/components/forms/form-helpers";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useBookingRequestMutation } from "@/hooks/use-booking-request-mutation";
import {
  BOOKING_SLOTS,
  fromDateKey,
  isClosedDay,
  isPastSlot,
  longDateLabel,
  slotLabel,
  toDateKey,
  todayKeyInFirmZone,
  whenLabel,
} from "@/lib/booking";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { bookingDetailDefaults, bookingSchema, organizationTypeLabels, type BookingInput } from "@/lib/validators";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const STORAGE_KEY = "sanyagold:requested-slots";
const noopSubscribe = () => () => {};

/** Slots this browser already requested — a courtesy guard against double-sending, not a global lock. */
function readRequested(): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function BookingScheduler() {
  // "Today" depends on the visitor's clock, so it's read on the client only (avoids hydration mismatch).
  const todayKey = useSyncExternalStore(
    noopSubscribe,
    () => todayKeyInFirmZone(),
    () => null,
  );
  if (!todayKey) return <SchedulerSkeleton />;
  return <Scheduler todayKey={todayKey} />;
}

function SchedulerSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" aria-hidden="true">
      <Skeleton className="h-[26rem] rounded-3xl" />
      <Skeleton className="h-[26rem] rounded-3xl" />
    </div>
  );
}

function Scheduler({ todayKey }: { todayKey: string }) {
  const reduce = useReducedMotion();
  const today = fromDateKey(todayKey);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [requested, setRequested] = useState<string[]>(readRequested);
  const [confirmed, setConfirmed] = useState<{ when: string; email: string } | null>(null);

  const year = view.getFullYear();
  const month = view.getMonth();
  const cells = useMemo(() => {
    const lead = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    return [
      ...Array<null>(lead).fill(null),
      ...Array.from({ length: count }, (_, i) => toDateKey(new Date(year, month, i + 1))),
    ];
  }, [year, month]);

  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastBookable = new Date(today.getTime() + siteConfig.booking.maxDaysAhead * 86_400_000);
  const canGoBack = view > firstMonth;
  const canGoForward = new Date(year, month + 1, 1) <= lastBookable;

  const form = useForm<Omit<BookingInput, "date" | "time">>({
    resolver: zodResolver(bookingSchema.omit({ date: true, time: true })),
    defaultValues: bookingDetailDefaults,
  });

  const mutation = useBookingRequestMutation({
    onFieldErrors: (issues) => applyServerIssues(form.setError, issues),
  });

  const submit = form.handleSubmit((details) => {
    if (!date || !time) return;
    mutation.mutate(
      { ...details, date, time },
      {
        onSuccess: () => {
          const key = `${date} ${time}`;
          const next = [...requested, key];
          setRequested(next);
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // Storage may be unavailable (private mode); the guard is optional.
          }
          setConfirmed({ when: whenLabel(date, time), email: details.email });
          form.reset(bookingDetailDefaults);
        },
      },
    );
  });

  const startOver = () => {
    setDate(null);
    setTime(null);
    setConfirmed(null);
    mutation.reset();
  };

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0.01 : 0.25 },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Step 1 — calendar */}
      <section aria-labelledby="calendar-title" className="rounded-3xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 id="calendar-title" className="font-serif text-2xl font-semibold" aria-live="polite">
            {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              aria-label="Previous month"
              disabled={!canGoBack}
              onClick={() => setView(new Date(year, month - 1, 1))}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-9"
              aria-label="Next month"
              disabled={!canGoForward}
              onClick={() => setView(new Date(year, month + 1, 1))}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[0.6875rem] font-medium tracking-wider text-muted-foreground uppercase">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-2" aria-hidden="true">
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1" role="group" aria-label="Choose a day">
          {cells.map((key, i) => {
            if (!key) return <span key={`blank-${i}`} />;
            const closed = isClosedDay(key, todayKey);
            const selected = key === date;
            return (
              <button
                key={key}
                type="button"
                disabled={closed}
                aria-pressed={selected}
                aria-label={`${longDateLabel(key)}${closed ? ", unavailable" : ""}`}
                onClick={() => {
                  setDate(key);
                  setTime(null);
                  setConfirmed(null);
                }}
                className={cn(
                  "relative aspect-square rounded-xl text-sm tabular-nums transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:text-base",
                  selected
                    ? "bg-primary font-semibold text-primary-foreground shadow-sm"
                    : closed
                      ? "cursor-not-allowed text-muted-foreground/40"
                      : "font-medium hover:bg-accent-soft",
                )}
              >
                {fromDateKey(key).getDate()}
                {key === todayKey && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-current"
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {siteConfig.booking.durationMinutes}-minute consultations, Monday to Friday. Times shown in{" "}
          {siteConfig.booking.timeZoneLabel} (Minnesota).
        </p>
      </section>

      {/* Steps 2 & 3 — time and details */}
      <section
        aria-label="Choose a time and add your details"
        className="rounded-3xl border bg-card p-5 shadow-sm sm:p-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          {confirmed ? (
            <motion.div
              key="sent"
              {...fade}
              className="flex h-full min-h-80 flex-col items-center justify-center text-center"
              role="status"
            >
              <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold">Request sent</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                You asked for <strong className="text-foreground">{confirmed.when}</strong>. We&apos;ve emailed a copy
                to {confirmed.email} and will confirm the time within one business day.
              </p>
              <Button variant="outline" className="mt-8" onClick={startOver}>
                Request another time
              </Button>
            </motion.div>
          ) : !date ? (
            <motion.div
              key="empty"
              {...fade}
              className="flex h-full min-h-80 flex-col items-center justify-center text-center"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-gold-ink">
                <CalendarDays className="size-6" aria-hidden="true" />
              </span>
              <p className="eyebrow mt-6">Step 1 of 3</p>
              <p className="mt-2 text-muted-foreground">Choose a day on the calendar.</p>
            </motion.div>
          ) : (
            <motion.div key={date} {...fade}>
              <p className="eyebrow">{time ? "Step 3 of 3" : "Step 2 of 3"}</p>
              <h3 className="mt-2 text-xl font-semibold">{longDateLabel(date)}</h3>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-label="Choose a time">
                {BOOKING_SLOTS.map((slot) => {
                  const past = isPastSlot(date, slot);
                  const taken = requested.includes(`${date} ${slot}`);
                  const unavailable = past || taken;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={unavailable}
                      aria-pressed={time === slot}
                      aria-label={`${slotLabel(slot)}${taken ? ", already requested" : past ? ", unavailable" : ""}`}
                      onClick={() => setTime(slot)}
                      className={cn(
                        "rounded-xl border py-2.5 text-xs font-medium tabular-nums transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:text-sm",
                        time === slot
                          ? "border-primary bg-primary text-primary-foreground"
                          : unavailable
                            ? "cursor-not-allowed text-muted-foreground/50 line-through"
                            : "hover:border-accent hover:bg-accent-soft",
                      )}
                    >
                      {slotLabel(slot)}
                    </button>
                  );
                })}
              </div>

              {time && (
                <Form {...form}>
                  <form noValidate onSubmit={submit} className="mt-6 grid gap-4" aria-busy={mutation.isPending}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input autoComplete="name" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" autoComplete="email" required {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Phone <span className="font-normal text-muted-foreground">(optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" autoComplete="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organizationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I&apos;m reaching out for a…</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger onBlur={field.onBlur} ref={field.ref}>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(organizationTypeLabels).map(([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="topic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            What would you like to discuss?{" "}
                            <span className="font-normal text-muted-foreground">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea rows={3} className="min-h-24" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <HoneypotField register={form.register("website")} />

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setTime(null)}>
                        <ArrowLeft /> Change time
                      </Button>
                      <Button type="submit" size="lg" variant="accent" disabled={mutation.isPending} className="group">
                        {mutation.isPending ? (
                          <>
                            <Loader2 className="animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            Request {slotLabel(time)}
                            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll confirm by email. Please don&apos;t include Social Security numbers or bank details.
                    </p>
                  </form>
                </Form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
