from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.crud.user import get_user, get_users, update_user
from app.schemas.user import UserResponse, UserUpdate, UserProfile
from app.dependencies.auth import get_current_active_user, get_verified_user

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    users = get_users(db, skip=skip, limit=limit)
    return users

@router.get("/me", response_model=UserProfile)
async def read_user_me(current_user = Depends(get_current_active_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_user_me(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    updated_user = update_user(db, current_user.user_id, user_update)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.get("/{user_id}", response_model=UserProfile)
async def read_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user