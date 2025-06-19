from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Team(Base):
    __tablename__ = "teams"
    
    team_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    team_bio = Column(Text)