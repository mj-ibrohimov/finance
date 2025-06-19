from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class TeamMemberRole(Base):
    __tablename__ = "team_member_role"
    
    role_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    
    # Relationships
    users = relationship("User", back_populates="team_role_rel")

class University(Base):
    __tablename__ = "university"
    
    uni_id = Column(Integer, primary_key=True, index=True)
    uni_name = Column(String(200), nullable=False)
    
    # Relationships
    educations = relationship("Education", back_populates="university")

class EmpComp(Base):
    __tablename__ = "emp_comp"
    
    company_id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(200), nullable=False)
    
    # Relationships
    employments = relationship("Employment", back_populates="company")

class Education(Base):
    __tablename__ = "education"
    
    edu_id = Column(Integer, primary_key=True, index=True)
    uni_id = Column(Integer, ForeignKey("university.uni_id"))
    education_status = Column(String(100))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    # Relationships
    university = relationship("University", back_populates="educations")
    bios = relationship("Bio", back_populates="education")

class Employment(Base):
    __tablename__ = "employment"
    
    emp_id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("emp_comp.company_id"))
    employment_status = Column(String(100))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    # Relationships
    company = relationship("EmpComp", back_populates="employments")
    bios = relationship("Bio", back_populates="employment")

class Bio(Base):
    __tablename__ = "bio"
    
    bio_id = Column(Integer, primary_key=True, index=True)
    edu_id = Column(Integer, ForeignKey("education.edu_id"))
    emp_id = Column(Integer, ForeignKey("employment.emp_id"))
    
    # Relationships
    education = relationship("Education", back_populates="bios")
    employment = relationship("Employment", back_populates="bios")
    users = relationship("User", back_populates="bio")

class User(Base):
    __tablename__ = "user"
    
    user_id = Column(Integer, primary_key=True, index=True)
    bio_id = Column(Integer, ForeignKey("bio.bio_id"), nullable=True)
    team_role = Column(Integer, ForeignKey("team_member_role.role_id"), nullable=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    about = Column(Text)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    bio = relationship("Bio", back_populates="users")
    team_role_rel = relationship("TeamMemberRole", back_populates="users")
    posts = relationship("Post", back_populates="author")
    likes = relationship("Like", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    social_profiles = relationship("UserSocialProfile", back_populates="user")