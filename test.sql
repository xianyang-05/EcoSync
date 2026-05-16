CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,

    company_name TEXT NOT NULL,
    registration_number TEXT UNIQUE,

    industry TEXT,
    sub_industry TEXT,
    business_stage TEXT,

    country TEXT,
    city TEXT,

    description TEXT,
    problem_statement TEXT,
    solution_summary TEXT,
    target_market TEXT,
    business_model TEXT,
    company_needs TEXT,

    team_size INT,
    founded_year INT,

    website_url TEXT,
    pitch_deck_url TEXT,

    profile_text TEXT,
    embedding VECTOR(384),

    verification_status TEXT CHECK (
        verification_status IN ('pending', 'verified', 'rejected')
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,

    mentor_name TEXT NOT NULL,

    job_title TEXT,
    organization TEXT,
    years_experience INT,

    expertise TEXT,
    industries TEXT,
    mentoring_topics TEXT,
    preferred_stage TEXT,

    country TEXT,
    city TEXT,

    availability TEXT,
    linkedin_url TEXT,

    bio TEXT,

    profile_text TEXT,
    embedding VECTOR(384),

    verification_status TEXT CHECK (
        verification_status IN ('pending', 'verified', 'rejected')
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE organizers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    firebase_uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,

    organizer_name TEXT NOT NULL,
    organization_type TEXT,

    country TEXT,
    city TEXT,

    description TEXT,
    focus_industries TEXT,
    programmes_managed TEXT,

    website_url TEXT,
    contact_email TEXT,

    profile_text TEXT,
    embedding VECTOR(384),

    verification_status TEXT CHECK (
        verification_status IN ('pending', 'verified', 'rejected')
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,

    relationship_type TEXT DEFAULT 'mentor_to_company',

    match_score FLOAT,
    confidence_score FLOAT,
    explanation TEXT,

    status TEXT CHECK (
        status IN ('recommended', 'approved', 'active', 'completed', 'rejected', 'cancelled')
    ) DEFAULT 'recommended',

    created_by UUID REFERENCES profiles(id),
    approved_by UUID REFERENCES profiles(id),

    start_date DATE,
    end_date DATE,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    relationship_id UUID REFERENCES relationships(id) ON DELETE CASCADE,
    given_by UUID REFERENCES companies(id),

    rating INT CHECK (rating BETWEEN 1 AND 5),
    outcome_score FLOAT,

    comments TEXT,
    goal_completed BOOLEAN,
    would_recommend BOOLEAN,

    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    source_type TEXT CHECK (
        source_type IN ('company', 'mentor', 'programme', 'document', 'relationship')
    ) NOT NULL,

    source_id UUID NOT NULL,

    chunk_text TEXT NOT NULL,
    chunk_index INT DEFAULT 0,

    embedding VECTOR(384),

    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE match_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    mentor_id UUID REFERENCES mentors(id) ON DELETE CASCADE,

    semantic_score FLOAT,
    ranking_score FLOAT,
    confidence_score FLOAT,

    recommendation_reason TEXT,
    retrieved_context TEXT,

    status TEXT CHECK (
        status IN ('pending', 'accepted', 'rejected', 'expired')
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT NOW()
);


