"use client";

import { useState, useEffect, Suspense, type ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles, Network, Shield, Users, Rocket, Mail, Lock, ArrowRight,
  ArrowLeft, Eye, EyeOff, Loader2, AlertCircle, Upload, Building2,
  User, MapPin, FileText, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { firebaseSignUp } from "@/lib/firebase";
import { registerUser, type UserRole } from "@/lib/supabase";

const roleConfig = {
  admin: {
    label: "Programme Organizer", subtitle: "Control Center", icon: Shield,
    accentClass: "text-primary", bgClass: "bg-primary-subtle",
    borderClass: "border-primary-border", dashboardPath: "/admin/dashboard",
  },
  mentor: {
    label: "Mentor", subtitle: "Productivity Hub", icon: Users,
    accentClass: "text-success", bgClass: "bg-success-container",
    borderClass: "border-success/25", dashboardPath: "/mentor/dashboard",
  },
  startup: {
    label: "Startup", subtitle: "Growth Assistant", icon: Rocket,
    accentClass: "text-warning", bgClass: "bg-warning-container",
    borderClass: "border-warning/25", dashboardPath: "/startup/dashboard",
  },
} as const;

type RoleKey = keyof typeof roleConfig;

const FileUploadBox = ({ label, file, onChange, accept }: { label: string; file: File | null; onChange: (e: ChangeEvent<HTMLInputElement>) => void; accept: string }) => (
  <div className="space-y-2">
    <span className="text-xs font-mono font-medium text-muted uppercase tracking-wider">{label}</span>
    <label className={cn("flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 cursor-pointer transition-all", file ? "border-primary/40 bg-primary-subtle" : "border-border hover:border-primary/30 hover:bg-surface-container")}>
      {file ? <Check className="h-5 w-5 text-primary" /> : <Upload className="h-5 w-5 text-muted-light" />}
      <span className="text-xs text-center text-muted">{file ? file.name : "Click to upload"}</span>
      <input type="file" className="hidden" accept={accept} onChange={onChange} />
    </label>
  </div>
);

const InputField = ({ id, label, icon: Icon, type = "text", value, onChange, placeholder, required = true }: { id: string; label: string; icon: typeof Mail; type?: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-xs font-mono font-medium text-muted uppercase tracking-wider">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full rounded-md border border-border bg-surface-container pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all" />
    </div>
  </div>
);

function SignUpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get("role") as RoleKey | null;
  const role: RoleKey = roleParam && roleParam in roleConfig ? roleParam : "startup";
  const config = roleConfig[role];
  const RoleIcon = config.icon;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Startup fields
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);

  // Admin fields
  const [organizerName, setOrganizerName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [adminCountry, setAdminCountry] = useState("");
  const [adminCity, setAdminCity] = useState("");
  const [adminDescription, setAdminDescription] = useState("");

  // Mentor fields
  const [mentorProfileFile, setMentorProfileFile] = useState<File | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const handleFileChange = (setter: (f: File | null) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.files?.[0] ?? null);
  };

  const validateStep1 = () => {
    if (!email || !password || !confirmPassword) { setError("All fields are required."); return false; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return false; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return false; }
    setError(null); return true;
  };

  const handleNext = () => { if (validateStep1()) setStep(2); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const cred = await firebaseSignUp(email, password);
      const uid = cred.user.uid;

      let regData: Record<string, unknown> = { firebase_uid: uid, email };

      if (role === "startup") {
        regData = { ...regData, company_name: companyName, country, city, founded_year: foundedYear ? parseInt(foundedYear) : null, website_url: websiteUrl || null };
      } else if (role === "admin") {
        regData = { ...regData, organizer_name: organizerName, organization_type: orgType, country: adminCountry, city: adminCity, description: adminDescription || null };
      } else {
        regData = { ...regData };
      }

      const result = await registerUser(role as UserRole, regData as never);
      if (!result.success) { setError(result.error || "Registration failed."); setIsLoading(false); return; }

      router.push(config.dashboardPath);
    } catch (err: unknown) {
      const fbErr = err as { code?: string };
      if (fbErr.code === "auth/email-already-in-use") setError("This email is already registered. Please sign in.");
      else if (fbErr.code === "auth/weak-password") setError("Password is too weak. Use at least 6 characters.");
      else setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  const renderStep2 = () => {
    if (role === "startup") return (
      <div className="space-y-4">
        <InputField id="company-name" label="Company Name" icon={Building2} value={companyName} onChange={setCompanyName} placeholder="Acme Corp" />
        <div className="grid grid-cols-2 gap-4">
          <InputField id="country" label="Country" icon={MapPin} value={country} onChange={setCountry} placeholder="Malaysia" />
          <InputField id="city" label="City" icon={MapPin} value={city} onChange={setCity} placeholder="Kuala Lumpur" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="founded-year" label="Founded Year" icon={Building2} type="number" value={foundedYear} onChange={setFoundedYear} placeholder="2024" required={false} />
          <InputField id="website" label="Website" icon={Network} value={websiteUrl} onChange={setWebsiteUrl} placeholder="https://..." required={false} />
        </div>
        <div className="pt-2 grid grid-cols-2 gap-4">
          <FileUploadBox label="Company Profile" file={profileFile} onChange={handleFileChange(setProfileFile)} accept=".pdf,.doc,.docx,.txt" />
          <FileUploadBox label="Pitch Deck" file={pitchDeckFile} onChange={handleFileChange(setPitchDeckFile)} accept=".pdf,.pptx,.ppt" />
        </div>
        <p className="text-[10px] font-mono text-muted-light leading-relaxed">Fields like industry, business model, and problem statement will be auto-extracted from your uploaded documents.</p>
      </div>
    );

    if (role === "mentor") return (
      <div className="space-y-4">
        <FileUploadBox label="Personal Profile / CV" file={mentorProfileFile} onChange={handleFileChange(setMentorProfileFile)} accept=".pdf,.doc,.docx,.txt" />
        <p className="text-[10px] font-mono text-muted-light leading-relaxed">Your name, expertise, industries, mentoring topics, location, and bio will be auto-extracted from the uploaded document.</p>
      </div>
    );

    return (
      <div className="space-y-4">
        <InputField id="org-name" label="Organizer Name" icon={User} value={organizerName} onChange={setOrganizerName} placeholder="Jane Doe" />
        <InputField id="org-type" label="Organization Type" icon={Building2} value={orgType} onChange={setOrgType} placeholder="Accelerator / Incubator / Government" />
        <div className="grid grid-cols-2 gap-4">
          <InputField id="admin-country" label="Country" icon={MapPin} value={adminCountry} onChange={setAdminCountry} placeholder="Malaysia" />
          <InputField id="admin-city" label="City" icon={MapPin} value={adminCity} onChange={setAdminCity} placeholder="Kuala Lumpur" />
        </div>
        <div className="space-y-2">
          <label htmlFor="admin-desc" className="text-xs font-mono font-medium text-muted uppercase tracking-wider">Description</label>
          <textarea id="admin-desc" value={adminDescription} onChange={(e) => setAdminDescription(e.target.value)} placeholder="Brief description of your organization…" rows={3}
            className="w-full rounded-md border border-border bg-surface-container px-4 py-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none" />
        </div>
      </div>
    );
  };

  return (
    <div className={cn("min-h-screen bg-background transition-opacity duration-700", mounted ? "opacity-100" : "opacity-0")}>
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary p-2"><Sparkles className="h-5 w-5 text-primary-on" /></div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">EcoSync</h1>
            <p className="text-[10px] font-mono text-muted uppercase tracking-[0.15em]">Orchestration Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-light uppercase tracking-wider">
          <Network className="h-3.5 w-3.5" /><span>v2.4.0</span>
        </div>
      </header>

      <main className="flex items-center justify-center px-6 pt-12 pb-20">
        <div className="w-full max-w-md">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /><span>Back to Interface Selection</span>
          </Link>

          <div className="text-center mb-8">
            <div className={cn("inline-flex items-center gap-2 rounded-sm border px-4 py-1.5 mb-5", config.bgClass, config.borderClass)}>
              <RoleIcon className={cn("h-3.5 w-3.5", config.accentClass)} />
              <span className={cn("text-xs font-mono font-semibold uppercase tracking-wider", config.accentClass)}>{config.label} · {config.subtitle}</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">Create Account</h2>
            <p className="text-sm text-muted">Register as {role === "admin" ? "an" : "a"} {config.label} in the EcoSync Ecosystem</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all", step >= s ? "bg-primary text-primary-on border-primary" : "bg-surface-container text-muted border-border")}>{s}</div>
                <span className="text-xs font-mono text-muted uppercase tracking-wider hidden sm:inline">{s === 1 ? "Credentials" : "Profile"}</span>
                {s === 1 && <div className={cn("flex-1 h-px transition-colors", step > 1 ? "bg-primary" : "bg-border")} />}
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-surface-card p-8">
            {error && (
              <div className="flex items-start gap-3 rounded-md bg-danger-container border border-danger/20 px-4 py-3 mb-6">
                <AlertCircle className="h-4 w-4 text-danger mt-0.5 shrink-0" /><p className="text-sm text-danger">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-5">
                  <InputField id="signup-email" label="Email Address" icon={Mail} type="email" value={email} onChange={setEmail} placeholder="operator@ecosync.dev" />
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-xs font-mono font-medium text-muted uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-light" />
                      <input id="signup-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                        className="w-full rounded-md border border-border bg-surface-container pl-10 pr-12 py-3 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <InputField id="signup-confirm" label="Confirm Password" icon={Lock} type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="••••••••" />
                  <button type="button" onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-primary text-primary-on px-6 py-3 font-semibold hover:bg-primary-hover transition-all focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <span>Continue</span><ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {renderStep2()}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => { setStep(1); setError(null); }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-md border border-border bg-surface-container text-foreground px-6 py-3 font-semibold hover:bg-surface-container-high transition-all">
                      <ArrowLeft className="h-4 w-4" /><span>Back</span>
                    </button>
                    <button type="submit" disabled={isLoading}
                      className="flex-1 flex items-center justify-center gap-2 rounded-md bg-primary text-primary-on px-6 py-3 font-semibold hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" /><span>Creating…</span></> : <><span>Create Account</span><ArrowRight className="h-4 w-4" /></>}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" /><span className="text-xs font-mono text-muted-light uppercase tracking-wider">or</span><div className="flex-1 h-px bg-border" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Already have an account?{" "}
                <Link href={`/auth/signin?role=${role}`} className="text-primary font-semibold hover:text-primary-hover transition-colors">Sign In</Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-muted-light uppercase tracking-[0.2em]">Secured by Firebase Auth + Supabase</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SignUpContent />
    </Suspense>
  );
}
