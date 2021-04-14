import { createHeaders } from "../../utils/api";

const fetchReviewsByMovie = ({movieId}) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${movieId}/reviews`, {
        headers: createHeaders(headers),
    });
}

const fetchReviewsByMoviePagination = ({movieId}, page, perPage) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${movieId}/reviews/${page}/${perPage}`, {
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

const deleteReview = (reviewId) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/reviews/${reviewId}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

export {
    fetchReviewsByMovie,
    fetchReviewsByMoviePagination,
    createReview,
    deleteReview,
}