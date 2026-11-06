"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, Loader2 } from "lucide-react";
import { applyServerIssues, HoneypotField } from "@/components/forms/form-helpers";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBookingRequestMutation } from "@/hooks/use-booking-request-mutation";
import { bookingDefaults, bookingSchema, type BookingInput } from "@/lib/validators";

const orgOptions: { value: BookingInput["organizationType"]; label: string }[] = [
  { value: "small-business", label: "Small business" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "professional-services", label: "Professional services firm" },
  { value: "individual", label: "Individual / business owner" },
  { value: "other", label: "Other" },
];

const selectClass =
  "border-input bg-card focus-visible:border-ring focus-visible:ring-ring/40 h-11 w-full rounded-xl border px-3.5 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm";

export function BookingForm() {
  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: bookingDefaults,
  });

  const mutation = useBookingRequestMutation({
    onSuccess: () => form.reset(bookingDefaults),
    onFieldErrors: (issues) => applyServerIssues(form.setError, issues),
  });
  const pending = mutation.isPending;

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit((values) => mutation.mutate(values))} className="grid gap-5" aria-busy={pending}>
        <div className="grid gap-5 sm:grid-cols-2">
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
                  Phone <span className="text-muted-foreground font-normal">(optional)</span>
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
                <FormControl>
                  <select {...field} className={selectClass}>
                    {orgOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="preferredTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred days and times</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Tuesday or Thursday mornings" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll email you to confirm an exact time.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What would you like to discuss? <span className="text-muted-foreground font-normal">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <HoneypotField register={form.register("website")} />

        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-fit">
          {pending ? <Loader2 className="animate-spin" /> : <CalendarPlus />}
          {pending ? "Sending…" : "Request a consultation"}
        </Button>
      </form>
    </Form>
  );
}
