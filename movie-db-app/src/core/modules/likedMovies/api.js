import { createHeaders } from "../../utils/api";

const fetchLikedMovies = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies`, {
        headers: createHeaders(headers),
    });
}

const createLikedMovie = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

export {
    fetchLikedMovies,
    createLikedMovie,
}