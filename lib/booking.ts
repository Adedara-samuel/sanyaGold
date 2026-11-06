import { siteConfig } from "@/lib/site-config";

/** Shared booking rules — used by the client scheduler AND re-checked by /api/booking. */
export const BOOKING_SLOTS = siteConfig.booking.slots;
export type BookingSlot = (typeof BOOKING_SLOTS)[number];

/** YYYY-MM-DD for a local Date (avoids toISOString's UTC shift). */
export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Parse YYYY-MM-DD into a local Date at midnight. */
export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

/** Today's date key in the firm's time zone (Minnesota), regardless of the visitor's zone. */
export function todayKeyInFirmZone(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: siteConfig.booking.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Current hour (0–23) in the firm's time zone. */
function currentHourInFirmZone(now = new Date()) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: siteConfig.booking.timeZone,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  );
}

export function isClosedDay(key: string, todayKey: string) {
  if (key < todayKey) return true;
  const day = fromDateKey(key).getDay();
  if ((siteConfig.booking.closedWeekdays as readonly number[]).includes(day)) return true;
  const ahead = (fromDateKey(key).getTime() - fromDateKey(todayKey).getTime()) / 86_400_000;
  return ahead > siteConfig.booking.maxDaysAhead;
}

/** Slots that have already started today (in Minnesota time) can't be booked. */
export function isPastSlot(key: string, slot: string, now = new Date()) {
  if (key !== todayKeyInFirmZone(now)) return false;
  return Number(slot.slice(0, 2)) <= currentHourInFirmZone(now);
}

export function isBookable(key: string, slot: string, now = new Date()) {
  const todayKey = todayKeyInFirmZone(now);
  return (
    (BOOKING_SLOTS as readonly string[]).includes(slot) && !isClosedDay(key, todayKey) && !isPastSlot(key, slot, now)
  );
}

export function slotLabel(slot: string) {
  const h = Number(slot.slice(0, 2));
  const m = slot.slice(3, 5);
  return `${h % 12 || 12}:${m} ${h < 12 ? "AM" : "PM"}`;
}

export function longDateLabel(key: string) {
  return fromDateKey(key).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function whenLabel(key: string, slot: string) {
  return `${longDateLabel(key)} at ${slotLabel(slot)} (${siteConfig.booking.timeZoneLabel})`;
}
