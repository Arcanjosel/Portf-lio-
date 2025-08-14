from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session, select

from ..database import get_session
from ..models import Experience, Profile, Project, Skill, BudgetRequest
from ..pdf import generate_portfolio_pdf

router = APIRouter()


# Profile
@router.get("/profile", response_model=Optional[Profile])
def get_profile(session: Session = Depends(get_session)) -> Optional[Profile]:
    result = session.exec(select(Profile)).first()
    return result


@router.post("/profile", response_model=Profile)
def create_profile(profile: Profile, session: Session = Depends(get_session)) -> Profile:
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


@router.put("/profile", response_model=Profile)
def upsert_profile(profile: Profile, session: Session = Depends(get_session)) -> Profile:
    existing = session.exec(select(Profile)).first()
    if existing:
        for field, value in profile.model_dump(exclude_unset=True).items():
            setattr(existing, field, value)
        session.add(existing)
        session.commit()
        session.refresh(existing)
        return existing
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


# Projects
@router.get("/projects", response_model=List[Project])
def list_projects(session: Session = Depends(get_session)) -> List[Project]:
    return list(session.exec(select(Project)))


@router.post("/projects", response_model=Project)
def create_project(project: Project, session: Session = Depends(get_session)) -> Project:
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@router.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: int, session: Session = Depends(get_session)) -> Project:
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project


@router.put("/projects/{project_id}", response_model=Project)
def update_project(project_id: int, project: Project, session: Session = Depends(get_session)) -> Project:
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    for field, value in project.model_dump(exclude_unset=True).items():
        setattr(db_project, field, value)
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    return db_project


@router.delete("/projects/{project_id}")
def delete_project(project_id: int, session: Session = Depends(get_session)) -> dict:
    db_project = session.get(Project, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    session.delete(db_project)
    session.commit()
    return {"ok": True}


# Skills
@router.get("/skills", response_model=List[Skill])
def list_skills(session: Session = Depends(get_session)) -> List[Skill]:
    return list(session.exec(select(Skill)))


@router.post("/skills", response_model=Skill)
def create_skill(skill: Skill, session: Session = Depends(get_session)) -> Skill:
    session.add(skill)
    session.commit()
    session.refresh(skill)
    return skill


@router.put("/skills/{skill_id}", response_model=Skill)
def update_skill(skill_id: int, skill: Skill, session: Session = Depends(get_session)) -> Skill:
    db_skill = session.get(Skill, skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill não encontrada")
    for field, value in skill.model_dump(exclude_unset=True).items():
        setattr(db_skill, field, value)
    session.add(db_skill)
    session.commit()
    session.refresh(db_skill)
    return db_skill


@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, session: Session = Depends(get_session)) -> dict:
    db_skill = session.get(Skill, skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill não encontrada")
    session.delete(db_skill)
    session.commit()
    return {"ok": True}


# Experiences
@router.get("/experiences", response_model=List[Experience])
def list_experiences(session: Session = Depends(get_session)) -> List[Experience]:
    return list(session.exec(select(Experience)))


@router.post("/experiences", response_model=Experience)
def create_experience(exp: Experience, session: Session = Depends(get_session)) -> Experience:
    session.add(exp)
    session.commit()
    session.refresh(exp)
    return exp


@router.put("/experiences/{exp_id}", response_model=Experience)
def update_experience(exp_id: int, exp: Experience, session: Session = Depends(get_session)) -> Experience:
    db_exp = session.get(Experience, exp_id)
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experiência não encontrada")
    for field, value in exp.model_dump(exclude_unset=True).items():
        setattr(db_exp, field, value)
    session.add(db_exp)
    session.commit()
    session.refresh(db_exp)
    return db_exp


@router.delete("/experiences/{exp_id}")
def delete_experience(exp_id: int, session: Session = Depends(get_session)) -> dict:
    db_exp = session.get(Experience, exp_id)
    if not db_exp:
        raise HTTPException(status_code=404, detail="Experiência não encontrada")
    session.delete(db_exp)
    session.commit()
    return {"ok": True}


# Budget
@router.post("/budget", response_model=BudgetRequest)
def create_budget(data: BudgetRequest, session: Session = Depends(get_session)) -> BudgetRequest:
    session.add(data)
    session.commit()
    session.refresh(data)
    return data


@router.get("/budget", response_model=List[BudgetRequest])
def list_budget(session: Session = Depends(get_session)) -> List[BudgetRequest]:
    q = select(BudgetRequest).order_by(BudgetRequest.created_at.desc())
    return list(session.exec(q))


# PDF
@router.get("/pdf")
def get_pdf(session: Session = Depends(get_session)):
    profile = session.exec(select(Profile)).first()
    projects = list(session.exec(select(Project)))
    skills = list(session.exec(select(Skill)))
    experiences = list(session.exec(select(Experience)))

    data = {
        "profile": profile.model_dump() if profile else {},
        "projects": [p.model_dump() for p in projects],
        "skills": [s.model_dump() for s in skills],
        "experiences": [e.model_dump() for e in experiences],
    }

    pdf_buf = generate_portfolio_pdf(data)
    return StreamingResponse(pdf_buf, media_type="application/pdf", headers={
        "Content-Disposition": "inline; filename=portfolio.pdf"
    })

