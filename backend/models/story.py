# we will have a branching pattern

from sqlalchemy import Column,Integer,String,DateTime,Boolean,ForeignKey,JSON
#sqlalchemy id an ORM which : object relation Mapping
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.database import Base

class Story(Base):
  __tablename__="stories"
  id =Column(Integer,primary_key=True,index=True)
  title=Column(String,index=True)
  session_id=Column(String,index=True)
  created_at=Column(DateTime(timezone=True),server_default=func.now())
  nodes=relationship("StoryNode",back_populates="story")
  visual_config = Column(JSON, nullable=True) #onetoone onetoMany(many things connected to many things)

class StoryNode(Base):
  __tablename__="story nodes"
  id=Column(Integer,primary_key=True,index=True)
  story_id=Column(Integer,ForeignKey("stories.id"),index=True)
  content=Column(String)
  is_root=Column(Boolean,default=False)
  is_ending=Column(Boolean,default=False)
  is_wining_ending=Column(Boolean,default=False)
  options=Column(JSON,default=list)
  story=relationship("Story",back_populates="nodes")





