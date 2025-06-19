from pydantic import BaseModel
from typing import Optional

class TeamMemberRoleBase(BaseModel):
    name: str

class TeamMemberRoleCreate(TeamMemberRoleBase):
    pass

class TeamMemberRoleResponse(TeamMemberRoleBase):
    role_id: int
    
    class Config:
        from_attributes = True

class TeamBase(BaseModel):
    name: str
    team_bio: Optional[str] = None

class TeamCreate(TeamBase):
    pass

class TeamResponse(TeamBase):
    team_id: int
    
    class Config:
        from_attributes = True