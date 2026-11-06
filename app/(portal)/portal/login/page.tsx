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
      <div aria-hidden="true" className="bg-accent/20 absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="bg-card mt-8 rounded-3xl border p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Client portal</h1>
          <p className="text-muted-foreground mt-2 text-sm">Sign in to upload documents and check on your requests.</p>
          <LoginForm />
        </div>
        <p className="text-muted-foreground mt-6 text-center text-sm">
          Not a client yet?{" "}
          <Link href="/book" className="text-foreground font-medium underline underline-offset-4">
            Book a free consultation
          </Link>
        </p>
        <p className="mt-3 text-center">
          <Link href="/" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
