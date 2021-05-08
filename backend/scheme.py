from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    UserId: str
    SberId: int
    Name: str
    Age: int
    Gender: str


class Habit(BaseModel):
    UserId: str
    Name: str
    DateOfBegin: datetime
    DateForEnd: int 
    Completed: bool


class Activity(BaseModel):
    HabitId: str
    DateOfActivity: datetime    

class HabitInfo(BaseModel):
    UserId: str
    Name: str    
    DateForEnd: int 