"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { HoneypotField, applyServerIssues } from "@/components/forms/form-helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api, ApiRequestError } from "@/lib/api";
import { cn } from "@/lib/utils";
import { newsletterSchema, type NewsletterInput } from "@/lib/validators";

const defaults: NewsletterInput = { email: "", consent: false, website: "" };

/** "Stay Connected with Us" newsletter signup, carried over from the previous site's footer. */
export function NewsletterSignup({ className }: { className?: string }) {
  const id = useId();
  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: defaults,
  });

  const mutation = useMutation({
    mutationKey: ["newsletter"],
    mutationFn: (data: NewsletterInput) => api.newsletter.subscribe(data),
    onSuccess: () => form.reset(defaults),
    onError: (error) => {
      if (error instanceof ApiRequestError && error.issues) applyServerIssues(form.setError, error.issues);
      toast.error("We couldn't subscribe you.", {
        description:
          error instanceof ApiRequestError && error.status === 429
            ? "Too many attempts. Please wait a minute and try again."
            : "Please try again later.",
      });
    },
  });

  const { errors } = form.formState;
  const pending = mutation.isPending;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12", className)}>
      <div>
        <h2 id={`${id}-title`} className="text-2xl font-semibold">
          Stay Connected with Us
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Practical tips on book-keeping, payroll, tax and running your organization, plus news from both firms. No
          spam, and you can unsubscribe at any time.
        </p>
      </div>

      {mutation.isSuccess ? (
        <p
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/8 px-5 py-4 text-sm font-medium"
        >
          <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
          Thank you for subscribing! Check your inbox for a welcome email.
        </p>
      ) : (
        <form
          noValidate
          aria-labelledby={`${id}-title`}
          aria-busy={pending}
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor={`${id}-email`} className="sr-only">
                Email address
              </label>
              <Mail
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id={`${id}-email`}
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${id}-email-error` : undefined}
                className="h-11 bg-background pl-10"
                {...form.register("email")}
              />
            </div>
            <Button type="submit" size="lg" className="h-11" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {pending ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          {errors.email && (
            <p id={`${id}-email-error`} className="mt-2 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}

          <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[var(--sg-ink)]"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
              {...form.register("consent")}
            />
            Yes, subscribe me to the newsletter.
          </label>
          {errors.consent && (
            <p id={`${id}-consent-error`} className="mt-1.5 text-sm text-destructive">
              {errors.consent.message}
            </p>
          )}

          <HoneypotField register={form.register("website")} />
        </form>
      )}
    </div>
  );
}
