from __future__ import annotations

from io import BytesIO
from typing import Any, Dict, List

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


def _p(text: str, style_name: str = "BodyText") -> Paragraph:
    styles = getSampleStyleSheet()
    return Paragraph(text, styles[style_name])


def generate_portfolio_pdf(data: Dict[str, Any]) -> BytesIO:
    buf = BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)
    story: List[Any] = []

    profile = data.get("profile") or {}
    name = profile.get("name", "Seu Nome")
    title = profile.get("title", "")
    bio = profile.get("bio", "")

    story.append(_p(f"<b>{name}</b>", "Title"))
    if title:
        story.append(_p(title, "Heading2"))
    if bio:
        story.append(_p(bio))
    story.append(Spacer(1, 12))

    # Contatos
    contacts = []
    for key in ["email", "phone", "location", "website", "linkedin", "github"]:
        val = profile.get(key)
        if val:
            contacts.append(f"<b>{key.title()}</b>: {val}")
    if contacts:
        story.append(_p("<b>Contato</b>", "Heading3"))
        for c in contacts:
            story.append(_p(c))
        story.append(Spacer(1, 12))

    # Skills
    skills = data.get("skills", [])
    if skills:
        story.append(_p("<b>Skills</b>", "Heading3"))
        for s in skills:
            row = f"{s.get('name', '')} — {s.get('level', '')} ({s.get('category', '')})"
            story.append(_p(row))
        story.append(Spacer(1, 12))

    # Experiências
    exps = data.get("experiences", [])
    if exps:
        story.append(_p("<b>Experiência</b>", "Heading3"))
        for e in exps:
            dates = ""
            if e.get("start_date"):
                dates = e.get("start_date")
            if e.get("end_date"):
                dates = f"{dates} - {e.get('end_date')}"
            story.append(_p(f"<b>{e.get('role','')}</b> — {e.get('company','')} {dates}"))
            if e.get("description"):
                story.append(_p(e["description"]))
            story.append(Spacer(1, 6))
        story.append(Spacer(1, 12))

    # Projetos
    projects = data.get("projects", [])
    if projects:
        story.append(_p("<b>Projetos</b>", "Heading3"))
        for p in projects:
            title_line = p.get("title", "")
            tags = p.get("tags")
            if tags:
                title_line = f"{title_line} — {tags}"
            story.append(_p(f"<b>{title_line}</b>"))
            if p.get("description"):
                story.append(_p(p["description"]))
            for link_key in ["url", "repo_url"]:
                if p.get(link_key):
                    story.append(_p(f"{link_key}: {p[link_key]}"))
            story.append(Spacer(1, 6))

    doc.build(story)
    buf.seek(0)
    return buf

