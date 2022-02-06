import { createHeaders } from "../../utils/api";

const fetchMovies = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies`, {
        headers: createHeaders(headers),
    });
}

const fetchMoviesPaginated = (page, perPage) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/paginate/${page}/${perPage}`, {
        headers: createHeaders(headers),
    });
}

const fetchFilteredMovies = (query) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/filter/${query}`, {
        headers: createHeaders(headers),
    });
}

const fetchMovie = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${id}`, {
        headers: createHeaders(headers),
    });
}

// file upload
const uploadImage = async(formData, data, user) => {
    const options = {
        method:'POST',
        headers: {
            'Authorization': `Bearer ${user.token}`,
        },
        body: formData,
    }
    delete options.headers['Content-Type'];

    return fetch(`${process.env.REACT_APP_BASE_API}/uploads`, options)
    .then((res) => res.json())
    .then((data) => data);
}

const createMovies = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies`, {
        method:'POST',
        'content-type': 'multipart/form-data',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const updateMovie = (data) => (headers) => {
    const {_id} = data;
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${_id}`, {
        method:'PATCH',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const deleteMovie = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${id}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

export {
    fetchMovies,
    fetchMoviesPaginated,
    fetchFilteredMovies,
    fetchMovie,
    createMovies,
    updateMovie,
    deleteMovie,
    uploadImage,
}