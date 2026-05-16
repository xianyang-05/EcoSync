import csv
import json
import ast
import random
import uuid
import os
from dotenv import load_dotenv

# Ensure we're in the right place relative to 'database'
from database import supabase

load_dotenv()

def parse_embedding(emb_string):
    if not emb_string:
        return None
    try:
        return ast.literal_eval(emb_string)
    except:
        return None

def clean_row(row):
    """Clean empty strings to None since Postgres expects correct types."""
    clean = {}
    for k, v in row.items():
        if v == '':
            clean[k] = None
        else:
            clean[k] = v
    # Ensure team_size and founded_year are int
    if 'team_size' in clean and clean['team_size'] is not None:
        try:
            clean['team_size'] = int(float(clean['team_size']))
        except:
            clean['team_size'] = None

    if 'founded_year' in clean and clean['founded_year'] is not None:
        try:
            clean['founded_year'] = int(float(clean['founded_year']))
        except:
            clean['founded_year'] = None

    if 'years_experience' in clean and clean['years_experience'] is not None:
        try:
            clean['years_experience'] = int(float(clean['years_experience']))
        except:
            clean['years_experience'] = None
            
    if 'embedding' in clean:
        clean['embedding'] = parse_embedding(clean['embedding'])
        
    return clean

def seed_database():
    print("🌱 Starting Seed Process...")
    
    # 1. COMPANIES
    print("Loading 10 Companies...")
    companies = []
    with open('../dataset/companies_500.csv', 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 10: break
            cleaned = clean_row(row)
            # Make sure it has a valid uuid to use later
            cleaned['id'] = str(uuid.uuid4())
            companies.append(cleaned)
            
    # Insert companies chunk by chunk
    for comp in companies:
        try:
            supabase.table("companies").insert(comp).execute()
        except Exception as e:
            print(f"Skipped comp: {e}")

    # 2. MENTORS
    print("Loading 15 Mentors...")
    mentors = []
    with open('../dataset/mentors_100.csv', 'r') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i >= 15: break
            cleaned = clean_row(row)
            cleaned['id'] = str(uuid.uuid4())
            mentors.append(cleaned)

    for ment in mentors:
        try:
            supabase.table("mentors").insert(ment).execute()
        except Exception as e:
            print(f"Skipped ment: {e}")

    # 3. KNOWLEDGE CHUNKS
    print("Loading 10 Knowledge Chunks...")
    try:
        with open('../dataset/knowledge_chunks_100.csv', 'r') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                if i >= 10: break
                chunk = {
                    "source_type": row.get('source_type', 'document'),
                    "source_id": str(uuid.uuid4()), # mock source id
                    "chunk_text": row.get('chunk_text'),
                    "embedding": parse_embedding(row.get('embedding'))
                }
                supabase.table("knowledge_chunks").insert(chunk).execute()
    except Exception as e:
        print(f"Failed chunks {e}")

    # 4. RELATIONSHIPS & FEEDBACK
    print("Building 20 Completed Relationships for HGT graph edges...")
    for _ in range(20):
        try:
            # Pick random company and mentor
            c = random.choice(companies)
            m = random.choice(mentors)
            
            # Create completed relationship
            rel = {
                "company_id": c['id'],
                "mentor_id": m['id'],
                "relationship_type": "mentor_to_company",
                "match_score": random.uniform(0.6, 0.99),
                "confidence_score": random.uniform(0.7, 0.95),
                "status": 'completed'
            }
            rel_resp = supabase.table("relationships").insert(rel).execute()
            rel_id = rel_resp.data[0]['id']
            
            # Link it to feedback (removing given_by to avoid cache staleness errors)
            feedback = {
                "relationship_id": rel_id,
                "rating": random.randint(3, 5),
                "outcome_score": random.uniform(0.5, 1.0),
                "goal_completed": random.choice([True, False]),
                "would_recommend": True,
                "comments": "This was a highly educational engagement."
            }
            supabase.table("feedback").insert(feedback).execute()
        except Exception as e:
            print(f"Skipped edge: {e}")

    print("✅ Database Seeding Complete! HGT graph edges generated.")

if __name__ == "__main__":
    seed_database()