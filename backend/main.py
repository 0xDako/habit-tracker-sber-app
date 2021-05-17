from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scheme import *
import pymongo
from bson.objectid import ObjectId
import uvicorn
import datetime


#############################
mongo_host = '127.0.0.1'
mongo_port = 27017
#############################

client = pymongo.MongoClient(host=mongo_host, port=mongo_port)
db = client.HabbitsDB

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user")
async def createUser(user: User):
    if db.users.find_one({"UserId": user.UserId}) == None:
        _id = db.users.insert_one(dict(user)).inserted_id
        return str(_id)
    else:
        return "0"


@app.delete("/user")
async def deleteUser(UserId: str):
    result = db.users.delete_many({"UserId": UserId}).deleted_count
    return result


@app.get("/user")
async def getUser(UserId: str):
    response = db.users.find_one({"UserId": UserId})
    result = {}
    result["UserId"] = response["UserId"]
    result["SberId"] = response["SberId"]
    result["Name"] = response["Name"]
    result["Age"] = response["Age"]
    result["Gender"] = response["Gender"]
    return result


@app.post("/habit")
async def createHabbit(habitInfo: HabitInfo):
    habit = dict(habitInfo)
    habit['Completed'] = False
    habit['DateOfBegin'] = datetime.datetime.now()
    _id = db.habits.insert_one(dict(habit)).inserted_id
    return str(_id)


@app.delete("/habit")
async def deleteHabit(HabitId: str):
    result = db.habits.delete_many({"_id": ObjectId(HabitId)}).deleted_count
    return result


@app.get("/habit")
async def findAllHabit(UserId: str):
    result = db.habits.find({"UserId": UserId})
    response = []

    for item in result: 
        item = dict(item)
        _id = str(item.pop("_id"))
        item["_id"] = _id
        selected_activities = db.activities.find({"HabitId": _id})
        only_dates = [act["DateOfActivity"] for act in selected_activities]
        progress = len(only_dates)
        item["progress"] = progress

        today_date = datetime.date.today()
        res = []
        
        for i in range(5):
            cont = 0
            for i in list(map(lambda x: x.date(), only_dates)):
                if today_date == i:
                    cont = 1
            res.append(cont) 
            today_date -= datetime.timedelta(days=1)
        item["fivedays"] = res
        response.append(item)
    return response


@app.post("/activity")
async def addActivity(activity: Activity):
    _id = db.activities.insert_one(dict(activity)).inserted_id
    return str(_id)


@app.delete("/activity")
async def deleteActivity( HabitId: str, DateOfActivity: datetime.datetime ):
    activity = {"HabitId": HabitId, "DateOfActivity" : DateOfActivity}
    result = db.activities.delete_one(activity).deleted_count
    return result


@app.get("/activity")
async def getAllActivities(habitId: str):
    result = db.activities.find({"HabitId": habitId})
    response = []
    for item in result:
        response.append(str(item["DateOfActivity"].date()))
    return {"DatesOfActivity": response}

uvicorn.run(app, host='127.0.0.1', port=3001)
