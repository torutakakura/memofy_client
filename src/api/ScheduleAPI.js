import axios from 'axios'

const baseUrl = "http://localhost:3001/schedules"

export const GetSchedule = async (date) => {
    const result = await axios.get(`${baseUrl}?notification_date=${date}`)
    return result.data[0]
}

export const GetMonthSchedules = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

export const CreateSchedule = async () => {
    const result = await axios.post(baseUrl)
}

export const UpdateSchedule = async () => {
    const result = await axios.put(baseUrl)
    
}

export const DeleteSchedule = async (id) => {
    const result = await axios.delete(`${baseUrl}/${id}`)
    return result
}