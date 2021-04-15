import { createHeaders } from "../../utils/api";

const fetchDirectors = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors`, {
        headers: createHeaders(headers),
    });
}

const fetchDirector = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors/${id}`, {
        headers: createHeaders(headers),
    });
}

const fetchMoviesByDirector = ({directorId}) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors/${directorId}/movies`, {
        headers: createHeaders(headers),
    });
}

const createDirector = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const updateDirector = (data) => (headers) => {
    const {_id} = data;
    return fetch(`${process.env.REACT_APP_BASE_API}/directors/${_id}`, {
        method:'PATCH',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const deleteDirector = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors/${id}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

const deleteDirectorAndMovies = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/directors/${id}/delete`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

export {
    fetchDirectors,
    fetchDirector,
    fetchMoviesByDirector,
    createDirector,
    updateDirector,
    deleteDirector,
    deleteDirectorAndMovies
}