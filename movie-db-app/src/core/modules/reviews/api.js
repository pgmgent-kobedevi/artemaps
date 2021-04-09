import { createHeaders } from "../../utils/api";

const fetchReviewsByMovie = ({movieId}) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${movieId}/reviews`, {
        headers: createHeaders(headers),
    });
}

const createReview = (data, movieId) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${movieId}/reviews`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

export {
    fetchReviewsByMovie,
    createReview,
}