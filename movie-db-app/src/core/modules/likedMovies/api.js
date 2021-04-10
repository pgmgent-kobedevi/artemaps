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

const deleteLikedMovie = ({toRemoveId}) => (headers) =>{
    // return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies/${toRemoveId}`, {
    //     method:'DELETE',
    //     headers: createHeaders(headers),
    //     body: JSON.stringify(toRemoveId),
    // });
}

const deleteLikedMovieTest = (toRemoveId, user) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies/${toRemoveId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
      }).then((response) => response.json());
}

export {
    fetchLikedMovies,
    createLikedMovie,
    deleteLikedMovie,
    deleteLikedMovieTest
}