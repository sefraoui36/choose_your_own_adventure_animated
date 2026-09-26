from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class StoryOptionLLM(BaseModel):
    text: str = Field(default="", description="the text of the option shown to the user")
    nextNode: Optional[Dict[str, Any]] = Field(default=None, description="the next node content and its options")


class StoryNodeLLM(BaseModel):
    content: str = Field(description="The main content of the story node")
    isEnding: bool = Field(default=False, description="Whether this node is an ending node")
    isWiningEnding: bool = Field(default=False, description="Whether the node is a winning node")
    options: Optional[List[StoryOptionLLM]] = Field(default_factory=list, description="The options for this node")


class StoryLLMResponse(BaseModel):
    title: str = Field(description="the title of the story")
    rootNode: StoryNodeLLM = Field(description="the root node of the story")