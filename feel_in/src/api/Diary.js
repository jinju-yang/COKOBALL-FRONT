import axios from 'axios';
import {format} from 'date-fns';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getEmotion = async(emotionId, token) => {
    try{
        const response = await axios.get(`${BASE_URL}/api/diaries/${emotionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch(error){
        console.log(error);
    }
}


export const WD = async(content, solutionId, token) => {
    const create = format(new Date(), 'yyyy-MM-dd');
    try{
        const response = await axios.post(`${BASE_URL}/api/diaries`,
            {
                createdAt: create,
                content: content,
                solutionId: solutionId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch(error){
        console.log(error);
    }
}