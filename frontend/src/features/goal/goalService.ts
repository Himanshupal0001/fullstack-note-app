import axios from "axios";

const API_URL = '/api/goals/';

//create new goal
const createGoal = async (goalData: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, goalData, config);
    return response.data;
}

const deleteGoal = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + id, config);
    console.log(response)
    return response.data;
}

const getGoal = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data;
}

const updateGoal = async (goalData: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, goalData, config);
    return response.data;
}
const goalService = {
    createGoal,
    getGoal,
    deleteGoal
}

export default goalService;