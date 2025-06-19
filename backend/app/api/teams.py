from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user import TeamMemberRole
from app.models.team import Team
from app.schemas.team import TeamMemberRoleResponse, TeamResponse
from app.dependencies.auth import get_verified_user

router = APIRouter()

@router.get("/roles", response_model=List[TeamMemberRoleResponse])
async def read_team_roles(
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    roles = db.query(TeamMemberRole).all()
    return roles

@router.get("/", response_model=List[TeamResponse])
async def read_teams(
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    teams = db.query(Team).all()
    return teams