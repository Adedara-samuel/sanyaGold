import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/portal/login-form";

export const metadata: Metadata = {
  title: "Client Portal Sign In",
  description: "Sign in to the Sanyagold client portal.",
};

export default function PortalLoginPage() {
  return (
    <main id="main" className="relative grid flex-1 place-items-center overflow-hidden px-4 py-16">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded-3xl border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Client portal</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to upload documents and check on your requests.</p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not a client yet?{" "}
          <Link href="/book" className="font-medium text-foreground underline underline-offset-4">
            Book a free consultation
          </Link>
        </p>
        <p className="mt-3 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
