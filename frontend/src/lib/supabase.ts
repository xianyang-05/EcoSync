import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oslsypcdrpkcnowrcmos.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zbHN5cGNkcnBrY25vd3JjbW9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODg3NDA2OSwiZXhwIjoyMDk0NDUwMDY5fQ.8ipl1NGLcfpywRDnjSLdjb8hVWmD6OuD78124AOJQAM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Role → table mapping ---

export type UserRole = "startup" | "mentor" | "admin";

const roleTableMap: Record<UserRole, string> = {
  startup: "companies",
  mentor: "mentors",
  admin: "organizers",
};

// --- Registration helpers ---

export interface StartupRegistration {
  firebase_uid: string;
  email: string;
  company_name: string;
  country: string;
  city: string;
  founded_year?: number;
  registration_number?: string;
  website_url?: string;
  // Auto-extracted fields (populated later from document upload)
  industry?: string;
  sub_industry?: string;
  business_stage?: string;
  description?: string;
  problem_statement?: string;
  solution_summary?: string;
  target_market?: string;
  business_model?: string;
  company_needs?: string;
  team_size?: number;
  profile_text?: string;
}

export interface MentorRegistration {
  firebase_uid: string;
  email: string;
  // Auto-extracted fields (populated from uploaded profile document)
  mentor_name?: string;
  job_title?: string;
  organization?: string;
  years_experience?: number;
  expertise?: string[];
  industries?: string[];
  mentoring_topics?: string[];
  preferred_stage?: string;
  country?: string;
  city?: string;
  linkedin_url?: string;
  bio?: string;
  profile_text?: string;
}

export interface OrganizerRegistration {
  firebase_uid: string;
  email: string;
  organizer_name: string;
  organization_type: string;
  country: string;
  city: string;
  description?: string;
  contact_email?: string;
  website_url?: string;
  focus_industries?: string[];
  programmes_managed?: string[];
}

export type RegistrationData =
  | StartupRegistration
  | MentorRegistration
  | OrganizerRegistration;

export async function registerUser(
  role: UserRole,
  data: RegistrationData
): Promise<{ success: boolean; error?: string }> {
  const table = roleTableMap[role];

  const { error } = await supabase.from(table).insert([data]);

  if (error) {
    console.error(`Supabase insert error (${table}):`, error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getUserByFirebaseUid(
  role: UserRole,
  firebaseUid: string
) {
  const table = roleTableMap[role];

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("firebase_uid", firebaseUid)
    .single();

  if (error) return null;
  return data;
}
