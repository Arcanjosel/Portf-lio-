from __future__ import annotations

from sqlmodel import Session, select

from .database import engine, create_db_and_tables
from .models import Profile, Project


def upsert_profile(session: Session) -> None:
    profile = session.exec(select(Profile)).first()
    if not profile:
        profile = Profile()
    profile.name = "Jean Carlos Costa do Nascimento"
    profile.title = "Desenvolvedor Full Stack"
    profile.bio = (
        "Profissional com experiência em produção com dois sistemas: gestão de oficina de costura (Myrthes Costuras) "
        "e gerenciador de válvulas de pressão e caldeiras conforme NR-13, com armazenamento em nuvem de documentos."
    )
    profile.phone = "+55 16 98154-1262"
    session.add(profile)
    session.commit()


def ensure_project(session: Session, title: str, description: str, url: str | None = None, tags: str | None = None) -> None:
    project = session.exec(select(Project).where(Project.title == title)).first()
    if not project:
        project = Project(title=title)
    project.description = description
    project.url = url
    project.tags = tags
    session.add(project)
    session.commit()


def main() -> None:
    create_db_and_tables()
    with Session(engine) as session:
        upsert_profile(session)
        ensure_project(
            session,
            title="Myrthes Costuras — Gestão de Oficina de Costura",
            description=(
                "Sistema em produção para controle de pedidos, prazos, clientes e fluxo de trabalho da oficina de costura."
            ),
            url=None,
            tags="gestão,produção,oficina,costura,web"
        )
        ensure_project(
            session,
            title="Gerenciador NR-13 — Válvulas e Caldeiras",
            description=(
                "Sistema em produção para gestão de válvulas de pressão e caldeiras segundo a NR-13, com armazenamento em nuvem de documentos, anexos de válvulas e manômetros, e seus respectivos documentos."
            ),
            url=None,
            tags="NR-13,industrial,documentos,nuvem,segurança"
        )


if __name__ == "__main__":
    main()
