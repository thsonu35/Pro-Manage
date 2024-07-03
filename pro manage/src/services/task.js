import axios from 'axios';

export const getAllTasks = async (timeframe) => {
    console.log(localStorage.getItem('token'))

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
   
    console.log(timeframe)

  try {
    const headers = {
      Authorization: token,
    };
    const response = await axios.get(`https://final-evolution-project-cuvette-q8hy2y2bb.vercel.app/api/tasks?filter=${timeframe}`,{headers});
    return response; // Return only data from the response
  } catch (error) {
   
    return error;
  }
};
