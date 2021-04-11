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

const deleteLikedMovieByMovieId = async (movieId, user) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        },
      }).then((response) => response.json());
}

export {
    fetchLikedMovies,
    createLikedMovie,
    deleteLikedMovieByMovieId
}