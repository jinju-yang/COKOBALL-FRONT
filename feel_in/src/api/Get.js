import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const diariesGet = async (emotionId, token) => {
  try{
    const response = await axios.get(`${BASE_URL}/api/diaries/${emotionId}`,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}