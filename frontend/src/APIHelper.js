import axios from "axios"

const API_URL = 'http://localhost:3001/'

export async function createUser(UserId, SberId, Name, Age, Gender) {
    const { data: answer } = await axios.post( API_URL + 'user', {
        UserId, SberId, Name, Age, Gender
    })
    return answer
}

export async function createHabbit(UserId, Name, DateForEnd) {
    const DateOfBegin =  Date();
    const Completed = false;
    
    console.log({
        UserId, Name, DateOfBegin, DateForEnd, Completed
    })
    const { data: answer } = await axios.post( API_URL + 'habit', {
        UserId, Name, DateOfBegin, DateForEnd, Completed
    })
    return answer   
}

async function deleteHabbit(HabitId) {
    const { data: answer } = await axios.delete( process.env.API_URL + 'habit?HabitId=' + `${HabitId}`,)
    return answer
}

async function getAllHabit(UserId) {
    const { data: answer } = await axios.get( process.env.API_URL + 'habit?UserId=' + `${UserId}`,)
    return answer
}

async function addActivity(UserId, Date) {
    const { data: answer } = await axios.post( process.env.API_URL + 'activity', {
        UserId, Date
    })
    return answer
}

