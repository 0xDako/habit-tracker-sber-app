import axios from "axios"

const API_URL = 'http://localhost:3001/'

export async function createUser(UserId, SberId, Name, Age, Gender) {
    const { data: answer } = await axios.post( API_URL + 'user/', {
        UserId: UserId,
        SberId: SberId,
        Name: Name,
        Age: Age,
        Gender: Gender
    })
    return answer
}
export async function createHabbit(UserId, Name, DateForEnd) {

    const { data: answer } = await axios.post( API_URL + 'habit', {
        UserId, Name, DateForEnd
    })
    return answer   
}

export async function getAllHabit(UserId) {
    const { data: answer } = await axios.get( API_URL + 'habit/',{
        params: {
            UserId: UserId,
          },
    })
    return answer
}

export async function deleteHabbit(HabitId) {
    const { data: answer } = await axios.delete( API_URL + 'habit?HabitId=' + `${HabitId}`,)
    return answer
}



async function addActivity(UserId, Date) {
    const { data: answer } = await axios.post( process.env.API_URL + 'activity', {
        UserId, Date
    })
    return answer
}

