from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    about = Column(Text)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign Keys
    bio_id = Column(Integer, ForeignKey("bios.bio_id"), nullable=True)
    team_role_id = Column(Integer, ForeignKey("team_member_roles.role_id"), nullable=True)
    
    # Relationships
    bio = relationship("Bio", back_populates="user")
    team_role = relationship("TeamMemberRole", back_populates="users")
    posts = relationship("Post", back_populates="author", cascade="all, delete-orphan")
    likes = relationship("Like", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    social_profiles = relationship("UserSocialProfile", back_populates="user", cascade="all, delete-orphan")

class TeamMemberRole(Base):
    __tablename__ = "team_member_roles"
    
    role_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(Text)
    
    # Relationships
    users = relationship("User", back_populates="team_role")

class Team(Base):
    __tablename__ = "teams"
    
    team_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    team_bio = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships can be added for team members when implementing team functionality

class Post(Base):
    __tablename__ = "posts"
    
    post_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    title = Column(String(200))
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    author = relationship("User", back_populates="posts")
    likes = relationship("Like", back_populates="post", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    stats = relationship("PostStats", back_populates="post", uselist=False, cascade="all, delete-orphan")

class Like(Base):
    __tablename__ = "likes"
    
    like_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.post_id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")
    
    # Unique constraint to prevent duplicate likes
    __table_args__ = (UniqueConstraint('user_id', 'post_id', name='unique_user_post_like'),)

class Comment(Base):
    __tablename__ = "comments"
    
    comment_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.post_id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")

class PostStats(Base):
    __tablename__ = "post_stats"
    
    post_id = Column(Integer, ForeignKey("posts.post_id"), primary_key=True)
    like_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    
    # Relationships
    post = relationship("Post", back_populates="stats")

class UserSocialProfile(Base):
    __tablename__ = "user_social_profiles"
    
    user_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True)
    network_id = Column(Integer, ForeignKey("social_networks.network_id"), primary_key=True)
    profile_url = Column(String(255), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="social_profiles")
    network = relationship("SocialNetwork", back_populates="user_profiles")

class SocialNetwork(Base):
    __tablename__ = "social_networks"
    
    network_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)
    
    # Relationships
    user_profiles = relationship("UserSocialProfile", back_populates="network")

class Bio(Base):
    __tablename__ = "bios"
    
    bio_id = Column(Integer, primary_key=True, index=True)
    edu_id = Column(Integer, ForeignKey("educations.edu_id"), nullable=True)
    emp_id = Column(Integer, ForeignKey("employments.emp_id"), nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="bio", uselist=False)
    education = relationship("Education", back_populates="bio")
    employment = relationship("Employment", back_populates="bio")

class Education(Base):
    __tablename__ = "educations"
    
    edu_id = Column(Integer, primary_key=True, index=True)
    uni_id = Column(Integer, ForeignKey("universities.uni_id"), nullable=False)
    education_status = Column(String(50))  # e.g., "Bachelor's", "Master's", "PhD"
    field_of_study = Column(String(100))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    # Relationships
    university = relationship("University", back_populates="educations")
    bio = relationship("Bio", back_populates="education")

class University(Base):
    __tablename__ = "universities"
    
    uni_id = Column(Integer, primary_key=True, index=True)
    uni_name = Column(String(200), nullable=False)
    location = Column(String(100))
    
    # Relationships
    educations = relationship("Education", back_populates="university")

class Employment(Base):
    __tablename__ = "employments"
    
    emp_id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.company_id"), nullable=False)
    employment_status = Column(String(50))  # e.g., "Full-time", "Part-time", "Intern"
    position = Column(String(100))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    # Relationships
    company = relationship("Company", back_populates="employments")
    bio = relationship("Bio", back_populates="employment")

class Company(Base):
    __tablename__ = "companies"
    
    company_id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(200), nullable=False)
    industry = Column(String(100))
    location = Column(String(100))
    
    # Relationships
    employments = relationship("Employment", back_populates="company")

# Email verification token model
class EmailVerificationToken(Base):
    __tablename__ = "email_verification_tokens"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    token = Column(String(255), unique=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship
    user = relationship("User")

# Password reset token model
class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    token = Column(String(255), unique=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    used = Column(Boolean, default=False)
    
    # Relationship
    user = relationship("User") 