from __future__ import annotations

from datetime import date, datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Profile(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    title: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None


class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    url: Optional[str] = None
    repo_url: Optional[str] = None
    tags: Optional[str] = None  # comma-separated


class Experience(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: str
    company: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    description: Optional[str] = None
    location: Optional[str] = None


class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    level: Optional[str] = None  # Beginner/Intermediate/Advanced/Expert
    category: Optional[str] = None  # e.g., Backend, Frontend, DevOps


class BudgetRequest(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company_name: Optional[str] = None
    contact_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    project_name: str
    project_summary: str
    scope_features: Optional[str] = None
    target_platforms: Optional[str] = None  # web, mobile, desktop
    deadline_weeks: Optional[int] = None
    budget_range: Optional[str] = None  # e.g., 5-10k, 10-20k, a definir
    attachments: Optional[str] = None  # future: comma-separated URLs
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

