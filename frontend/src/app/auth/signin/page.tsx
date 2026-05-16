"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Network,
  Shield,
  Users,
  Rocket,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { firebaseSignIn } from "@/lib/firebase";

const roleConfig = {
  admin: {
    label: "Programme Organizer",
    subtitle: "Control Center",
    icon: Shield,
    accentClass: "text-primary",
    bgClass: "bg-primary-subtle",
    borderClass: "border-primary-border",
    dashboardPath: "/admin/dashboard",
  },
  mentor: {
    label: "Mentor",
    subtitle: "Productivity Hub",
    icon: Users,
    accentClass: "text-success",
    bgClass: "bg-success-container",
    borderClass: "border-success/25",
    dashboardPath: "/mentor/dashboard",
  },
  startup: {
    label: "Startup",
    subtitle: "Growth Assistant",
    icon: Rocket,
    accentClass: "text-warning",
    bgClass: "bg-warning-container",
    borderClass: "border-warning/25",
    dashboardPath: "/startup/dashboard",
  },
} as const;

type RoleKey = keyof typeof roleConfig;

function SignInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get("role") as RoleKey | null;
  const role: RoleKey = roleParam && roleParam in roleConfig ? roleParam : "startup";
  const config = roleConfig[role];
  const RoleIcon = config.icon;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await firebaseSignIn(email, password);
      router.push(config.dashboardPath);
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      switch (firebaseError.code) {
        case "auth/user-not-found":
          setError("No account found with this email. Please sign up first.");
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address format.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Authentication failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-background transition-opacity duration-700",
        mounted ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary p-2">
            <Sparkles className="h-5 w-5 text-primary-on" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Nexus Ecosystem
            </h1>
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.15em]">
              Orchestration Engine
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-light uppercase tracking-wider">
          <Network className="h-3.5 w-3.5" />
          <span>v2.4.0</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex items-center justify-center px-6 pt-12 pb-20">
        <div className="w-full max-w-md">
          {/* Back link */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Interface Selection</span>
          </Link>

          {/* Role badge */}
          <div className="text-center mb-8">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-sm border px-4 py-1.5 mb-5",
                config.bgClass,
                config.borderClass
              )}
            >
              <RoleIcon className={cn("h-3.5 w-3.5", config.accentClass)} />
              <span
                className={cn(
                  "text-xs font-mono font-semibold uppercase tracking-wider",
                  config.accentClass
                )}
              >
                {config.label} · {config.subtitle}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
              System Authentication
            </h2>
            <p className="text-sm text-muted">
              Enter your credentials to access the {config.label} interface
            </p>
          </div>

          {/* Sign In card */}
          <div className="rounded-lg border border-border bg-surface-card p-8">
            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3 rounded-md bg-danger-container border border-danger/20 px-4 py-3 mb-6">
                <AlertCircle className="h-4 w-4 text-danger mt-0.5 shrink-0" />
                <p className="text-sm text-danger">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="signin-email"
                  className="text-xs font-mono font-medium text-muted uppercase tracking-wider"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
                  <input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@nexus.dev"
                    required
                    className="w-full rounded-md border border-border bg-surface-container pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="signin-password"
                  className="text-xs font-mono font-medium text-muted uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
                  <input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-md border border-border bg-surface-container pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-md bg-primary text-primary-on px-6 py-3 font-semibold",
                  "hover:bg-primary-hover transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Authenticating…</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-mono text-muted-light uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Sign Up link */}
            <div className="text-center">
              <p className="text-sm text-muted">
                New to the ecosystem?{" "}
                <Link
                  href={`/auth/signup?role=${role}`}
                  className="text-primary font-semibold hover:text-primary-hover transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative footer */}
          <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-muted-light uppercase tracking-[0.2em]">
              Secured by Firebase Authentication
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignInContent />
    </Suspense>
  );
}
