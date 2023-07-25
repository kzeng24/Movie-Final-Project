import axios from 'axios';

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const MOVIES_API = `${SERVER_API_URL}/search`;

export const findMovies = async ({ title, actor, director, year, genre }) => {
    const response = await axios.get(MOVIES_API, { title, actor, director, year, genre });
    const movies = response.data;
    return movies;
}