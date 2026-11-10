"use client";

import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { firms } from "@/content/firms";
import { servicesForFirm } from "@/content/services";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/hooks/use-contact-mutation";
import { contactDefaults, contactSchema, type ContactInput } from "@/lib/validators";
import { HoneypotField, applyServerIssues } from "@/components/forms/form-helpers";

// Grouped by the independent firm that provides each service.
const serviceGroups = firms.map((firm) => ({
  firm: firm.name,
  options: servicesForFirm(firm.id).map((service) => ({ value: service.slug, label: service.title })),
}));

export function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
  });

  const mutation = useContactMutation({
    onSuccess: () => form.reset(contactDefaults),
    onFieldErrors: (issues) => applyServerIssues(form.setError, issues),
  });

  const pending = mutation.isPending;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
        className="grid gap-5"
        aria-busy={pending}
      >
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
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Organization <span className="font-normal text-muted-foreground">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What can we help with?</FormLabel>
              <Select
                value={field.value || "not-sure"}
                onValueChange={(value) => field.onChange(value === "not-sure" ? "" : value)}
              >
                <FormControl>
                  <SelectTrigger onBlur={field.onBlur} ref={field.ref}>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                  {serviceGroups.map((group) => (
                    <Fragment key={group.firm}>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel className="font-semibold text-foreground">{group.firm}</SelectLabel>
                        {group.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </Fragment>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell us a little about your organization and what you need."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <HoneypotField register={form.register("website")} />

        <p className="text-xs text-muted-foreground">
          Please don&apos;t include Social Security numbers, bank details or other sensitive information in this form.
        </p>

        <Button type="submit" size="lg" variant="default" disabled={pending} className="w-full sm:w-fit">
          {pending ? <Loader2 className="animate-spin" /> : <Send />}
          {pending ? "Sending…" : "Send message"}
        </Button>
      </form>
    </Form>
  );
}
