from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import companies, mentors, organizers, knowledge_chunks

app = FastAPI(
    title="EcoSync API",
    description="Mentor-startup matching platform with semantic embeddings",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(companies.router)
app.include_router(mentors.router)
app.include_router(organizers.router)
app.include_router(knowledge_chunks.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "EcoSync API"}
