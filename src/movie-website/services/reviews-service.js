import axios from 'axios';

const SERVER_API_URL = "https://movie-node-server-app.onrender.com/api"; //process.env.REACT_APP_SERVER_API_URL;
const REVIEWS_API = `${SERVER_API_URL}/reviews`;

export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review)
    return response.data;
}

export const findReviews = async () => {
    const response = await axios.get(REVIEWS_API);
    const reviews = response.data;
    return reviews;
}

export const findCriticReviews = async (criticUsername) => {
    const response = await axios.get(`${REVIEWS_API}/findCriticReviews/${criticUsername}`);
    const reviews = response.data;
    return reviews;
}


export const findMovieReviews = async (mid) => {
    const response = await axios.get(`${REVIEWS_API}/findMovieReviews/${mid}`)
    const reviews = response.data;
    return reviews;
}

export const deleteReview = async (rid) => {
    const response = await axios.delete(`${REVIEWS_API}/${rid}`)
    return response.data
}

export const updateReview = async (review) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return review;
}