import axios from 'axios';


const BASE_URL = process.env.REACT_APP_API_URL;

export const solutionPost = async(solutions, token) => {
    try{
        const response = axios.post(`${BASE_URL}/api/solutions/batch`,
            {
                solutions: solutions
            },
        );
        return response.data;
    } catch(error){
        console.log(error);
    }
}