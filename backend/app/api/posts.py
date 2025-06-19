from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.crud.post import (
    get_post, get_posts, get_user_posts, create_post, update_post, 
    approve_post, delete_post, like_post, unlike_post, 
    create_comment, get_post_comments, delete_comment
)
from app.schemas.post import (
    PostResponse, PostCreate, PostUpdate, PostWithStats,
    CommentResponse, CommentCreate, LikeResponse
)
from app.dependencies.auth import (
    get_current_active_user, get_verified_user, get_head_of_team
)

router = APIRouter()

@router.get("/", response_model=List[PostResponse])
async def read_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    posts = get_posts(db, skip=skip, limit=limit, approved_only=True)
    return posts

@router.get("/pending", response_model=List[PostResponse])
async def read_pending_posts(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_head_of_team)
):
    posts = get_posts(db, skip=skip, limit=limit, approved_only=False)
    return [post for post in posts if not post.is_approved]

@router.post("/", response_model=PostResponse)
async def create_new_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    return create_post(db=db, post=post, user_id=current_user.user_id)

@router.get("/{post_id}", response_model=PostWithStats)
async def read_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    db_post = get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if not db_post.is_approved or not db_post.is_published:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Get comments
    comments = get_post_comments(db, post_id)
    
    # Build response with stats
    response_data = {
        **db_post.__dict__,
        "like_count": db_post.stats.like_count if db_post.stats else 0,
        "comment_count": db_post.stats.comment_count if db_post.stats else 0,
        "comments": comments
    }
    
    return response_data

@router.put("/{post_id}", response_model=PostResponse)
async def update_existing_post(
    post_id: int,
    post_update: PostUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    db_post = get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if db_post.user_id != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updated_post = update_post(db, post_id, post_update)
    return updated_post

@router.post("/{post_id}/approve", response_model=PostResponse)
async def approve_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_head_of_team)
):
    approved_post = approve_post(db, post_id)
    if not approved_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return approved_post

@router.delete("/{post_id}")
async def delete_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    db_post = get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Allow deletion by post author or head of team
    if db_post.user_id != current_user.user_id and (
        not current_user.team_role_rel or 
        current_user.team_role_rel.name not in ["head_of_team", "admin"]
    ):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    success = delete_post(db, post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return {"message": "Post deleted successfully"}

@router.post("/{post_id}/like", response_model=LikeResponse)
async def like_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    db_like = like_post(db, post_id, current_user.user_id)
    if not db_like:
        raise HTTPException(status_code=400, detail="Post already liked")
    return db_like

@router.delete("/{post_id}/like")
async def unlike_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    success = unlike_post(db, post_id, current_user.user_id)
    if not success:
        raise HTTPException(status_code=400, detail="Post not liked")
    return {"message": "Post unliked successfully"}

@router.post("/{post_id}/comments", response_model=CommentResponse)
async def create_new_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    # Check if post exists and is published
    db_post = get_post(db, post_id)
    if not db_post or not db_post.is_approved or not db_post.is_published:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return create_comment(db, comment, post_id, current_user.user_id)

@router.get("/{post_id}/comments", response_model=List[CommentResponse])
async def read_post_comments(
    post_id: int,
    db: Session = Depends(get_db)
):
    # Check if post exists and is published
    db_post = get_post(db, post_id)
    if not db_post or not db_post.is_approved or not db_post.is_published:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return get_post_comments(db, post_id)

@router.delete("/comments/{comment_id}")
async def delete_existing_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    # Note: You might want to add permission checking here
    success = delete_comment(db, comment_id)
    if not success:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment deleted successfully"}

@router.get("/user/{user_id}", response_model=List[PostResponse])
async def read_user_posts(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_verified_user)
):
    posts = get_user_posts(db, user_id, skip, limit)
    # Filter to only show approved posts unless it's the user's own posts
    if user_id != current_user.user_id:
        posts = [post for post in posts if post.is_approved and post.is_published]
    return posts