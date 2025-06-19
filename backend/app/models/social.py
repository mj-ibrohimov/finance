from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class SocialNetwork(Base):
    __tablename__ = "social_network"
    
    network_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    
    # Relationships
    user_profiles = relationship("UserSocialProfile", back_populates="network")

class UserSocialProfile(Base):
    __tablename__ = "user_social_profiles"
    
    user_id = Column(Integer, ForeignKey("user.user_id"), primary_key=True)
    network_id = Column(Integer, ForeignKey("social_network.network_id"), primary_key=True)
    profile_url = Column(String(500), nullable=False)
    
    # Relationships
    user = relationship("User", back_populates="social_profiles")
    network = relationship("SocialNetwork", back_populates="user_profiles")