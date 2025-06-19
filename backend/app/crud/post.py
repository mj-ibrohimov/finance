from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.post import Post, Like, Comment, PostStats
from app.schemas.post import PostCreate, PostUpdate, CommentCreate
from typing import Optional, List

def get_post(db: Session, post_id: int) -> Optional[Post]:
    return db.query(Post).filter(Post.post_id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 100, approved_only: bool = True):
    query = db.query(Post)
    if approved_only:
        query = query.filter(Post.is_approved == True, Post.is_published == True)
    return query.offset(skip).limit(limit).all()

def get_user_posts(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Post).filter(Post.user_id == user_id).offset(skip).limit(limit).all()

def create_post(db: Session, post: PostCreate, user_id: int) -> Post:
    db_post = Post(
        title=post.title,
        content=post.content,
        user_id=user_id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    # Create post stats
    post_stats = PostStats(post_id=db_post.post_id)
    db.add(post_stats)
    db.commit()
    
    return db_post

def update_post(db: Session, post_id: int, post_update: PostUpdate) -> Optional[Post]:
    db_post = get_post(db, post_id)
    if db_post:
        update_data = post_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_post, field, value)
        db.commit()
        db.refresh(db_post)
    return db_post

def approve_post(db: Session, post_id: int) -> Optional[Post]:
    db_post = get_post(db, post_id)
    if db_post:
        db_post.is_approved = True
        db_post.is_published = True
        db.commit()
        db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int) -> bool:
    db_post = get_post(db, post_id)
    if db_post:
        db.delete(db_post)
        db.commit()
        return True
    return False

def like_post(db: Session, post_id: int, user_id: int) -> Optional[Like]:
    # Check if already liked
    existing_like = db.query(Like).filter(
        and_(Like.post_id == post_id, Like.user_id == user_id)
    ).first()
    
    if existing_like:
        return None
    
    # Create like
    db_like = Like(post_id=post_id, user_id=user_id)
    db.add(db_like)
    
    # Update post stats
    post_stats = db.query(PostStats).filter(PostStats.post_id == post_id).first()
    if post_stats:
        post_stats.like_count += 1
    
    db.commit()
    db.refresh(db_like)
    return db_like

def unlike_post(db: Session, post_id: int, user_id: int) -> bool:
    db_like = db.query(Like).filter(
        and_(Like.post_id == post_id, Like.user_id == user_id)
    ).first()
    
    if db_like:
        db.delete(db_like)
        
        # Update post stats
        post_stats = db.query(PostStats).filter(PostStats.post_id == post_id).first()
        if post_stats and post_stats.like_count > 0:
            post_stats.like_count -= 1
        
        db.commit()
        return True
    return False

def create_comment(db: Session, comment: CommentCreate, post_id: int, user_id: int) -> Comment:
    db_comment = Comment(
        content=comment.content,
        post_id=post_id,
        user_id=user_id
    )
    db.add(db_comment)
    
    # Update post stats
    post_stats = db.query(PostStats).filter(PostStats.post_id == post_id).first()
    if post_stats:
        post_stats.comment_count += 1
    
    db.commit()
    db.refresh(db_comment)
    return db_comment

def get_post_comments(db: Session, post_id: int) -> List[Comment]:
    return db.query(Comment).filter(Comment.post_id == post_id).all()

def delete_comment(db: Session, comment_id: int) -> bool:
    db_comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()
    if db_comment:
        post_id = db_comment.post_id
        db.delete(db_comment)
        
        # Update post stats
        post_stats = db.query(PostStats).filter(PostStats.post_id == post_id).first()
        if post_stats and post_stats.comment_count > 0:
            post_stats.comment_count -= 1
        
        db.commit()
        return True
    return False