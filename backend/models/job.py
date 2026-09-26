#the reason we need a job model is cause the story takes a little bit of time to be created by the LLM ( it will tell us the status of the story creation)
#1.The frontend submit a job and the backend returns the job so well be able to view job
#2.and then frontend asks if the job is done and then the backend will report the status of the job then job = done the backend will send
#3.story



from sqlalchemy import Column,Integer,String,DateTime
#sqlalchemy id an ORM which : object relation Mapping
from sqlalchemy.sql import func
from db.database import Base

class StoryJob(Base):
    __tablename__="story_jobs"
    id=Column(Integer,primary_key=True,index=True)
    job_id=Column(String,index=True,unique=True)
    session_id=Column(String,index=True)
    theme=Column(String)
    status=Column(String)
    story_id=Column(Integer,nullable=True)
    error=Column(String,nullable=True)
    created_at=Column(DateTime(timezone=True),server_default=func.now())
    completed_at=Column(DateTime(timezone=True),nullable=True)



