from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class PostResponse(PostBase):
    post_id: int
    user_id: int
    is_approved: bool
    is_published: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    comment_id: int
    user_id: int
    post_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class LikeResponse(BaseModel):
    like_id: int
    user_id: int
    post_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PostWithStats(PostResponse):
    like_count: int = 0
    comment_count: int = 0
    comments: List[CommentResponse] = []
    
    class Config:
        from_attributes = True