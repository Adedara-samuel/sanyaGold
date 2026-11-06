"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * PLACEHOLDER sign-in. No credentials are checked or stored.
 * TODO(portal): replace with a real auth provider (Auth.js, Clerk, Supabase Auth…)
 * including MFA, which is strongly recommended for financial documents.
 */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/portal/dashboard");
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="portal-email">Email</Label>
        <Input
          id="portal-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="portal-password">Password</Label>
        <Input id="portal-password" type="password" autoComplete="current-password" required />
      </div>
      <Button type="submit" size="lg" className="mt-2">
        <LogIn /> Sign in
      </Button>
      <p className="flex gap-2 rounded-xl bg-accent-soft p-3 text-xs leading-relaxed text-foreground">
        <Info className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" />
        Preview only: sign-in isn&apos;t connected yet. Any email and password will open a demo dashboard.
      </p>
    </form>
  );
}
