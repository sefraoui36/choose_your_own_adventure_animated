import uuid
from typing import Optional
from datetime import datetime
from fastapi import APIRouter,Depends,HTTPException,Cookie,Response,BackgroundTasks
from sqlalchemy.orm import Session

from db.database import get_db,SessionLocal
from models.story import Story,StoryNode
from models.job import StoryJob
from schemas.story import (
CompleteStoryNodeResponse,CreateStoryRequest,CompleteStoryResponse
)
from schemas.job import StoryJobResponse, StoryJobCreate
from core.story_generator import StoryGenerator
router=APIRouter(
    prefix="/stories",
    tags=["stories"]
)

def get_session_id(session_id:Optional[str]=Cookie(None)):
    if not session_id:
        session_id=str(uuid.uuid4())
    return session_id
# when they send the request it will take 20s to generate the story , we don't want to wait 20 s before we return the story to the user
#then the request is hanging (nothing will happen all  the time)
@router.post("/create",response_model=StoryJobResponse)
def create_story(
        request:CreateStoryRequest,
        background_tasks:BackgroundTasks,
        response:Response,
        session_id:str=Depends(get_session_id),
        db:Session=Depends(get_db) #db is the database from the func(get_db())
):
    response.set_cookie(key="session_id",value=session_id,httponly=True)

    job_id=str(uuid.uuid4())
    job=StoryJob(
        job_id=job_id,
        session_id=session_id,
        theme=request.theme,
        status="pending"

    )
    db.add(job)
    db.commit()
    db.refresh(job)
    #TODO: add background tasks,generate story
    background_tasks.add_task(
        generate_story_task,
        job_id=job_id,
        theme=request.theme,
        session_id=session_id

    )
    return job
def generate_story_task(job_id:str,theme:str,session_id:str):
    db=SessionLocal() # this session will do a job teh other one will wait (the comments below)
    try:
        job=db.query(StoryJob).filter(StoryJob.job_id == job_id).first()
        if not job:
         return
        try:
            job.status="processing"
            db.commit()
            story=StoryGenerator.generate_story(db,session_id,theme)
            job.story_id=story.id #TODO: update story id
            job.status="completed"
            job.completed_at=datetime.now()
            db.commit()
        except Exception as e:
            job.status = "failed"
            job.completed_at = datetime.now()
            job.error = str(e)
            db.commit()
    finally:
        db.close()

@router.get("/{story_id}/complete",response_model=CompleteStoryResponse)
def get_complete_story(story_id:int,db:Session=Depends(get_db)):
    story=db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404,detail="Story not found")
    complete_story=build_complete_story_tree(db,story)
    return complete_story


def build_complete_story_tree(db: Session, story: Story) -> CompleteStoryResponse:
    # 1. Fetch all nodes for this story
    nodes = db.query(StoryNode).filter(StoryNode.story_id == story.id).all()

    if not nodes:
        raise HTTPException(status_code=404, detail="No nodes found for this story")

    # 2. Find the root node
    root_node = next((node for node in nodes if node.is_root), None)
    if not root_node:
        raise HTTPException(status_code=500, detail="Story root node not found")

    # 3. Build a lookup dict {node_id: CompleteStoryNodeResponse}
    node_dict = {}
    for node in nodes:
        options = []
        for opt in (node.options or []):
            options.append({
                "text": opt["text"],
                "node_id": opt["node_id"]
            })

        node_response = CompleteStoryNodeResponse(
            id=node.id,
            content=node.content,
            is_ending=node.is_ending,
            is_wining_ending=node.is_wining_ending,   # ← one n
            options=options
        )
        node_dict[node.id] = node_response

    # 4. Return the story-level response
    return CompleteStoryResponse(
        id=story.id,
        title=story.title,
        session_id=story.session_id,
        created_at=story.created_at,
        root_node=node_dict[root_node.id],
        all_nodes=node_dict,
        visual_config = story.visual_config
    )