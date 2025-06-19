from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    about: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    about: Optional[str] = None

class UserResponse(UserBase):
    user_id: int
    is_verified: bool
    is_active: bool
    created_at: datetime
    team_role: Optional[int] = None
    
    class Config:
        from_attributes = True

class UserProfile(UserResponse):
    bio_id: Optional[int] = None
    
    class Config:
        from_attributes = True