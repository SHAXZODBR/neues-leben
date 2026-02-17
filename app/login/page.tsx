"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";

export default function LoginPage() {
  const router = useRouter();
  const { session, supabase } = useSupabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      const searchParams = new URLSearchParams(window.location.search);
      const returnUrl = searchParams.get("returnUrl") || "/dashboard-cms-2024";
      router.replace(returnUrl);
    }
  }, [session, router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!supabase) {
      setStatus("Auth service unavailable");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    setStatus("Logged in! Redirecting…");

    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get("returnUrl") || "/dashboard-cms-2024";
    router.replace(returnUrl);
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@company.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm text-muted-foreground">{status}</p>}
    </section>
  );
}






