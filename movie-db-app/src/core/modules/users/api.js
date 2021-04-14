import { createHeaders } from "../../utils/api";

const fetchUsers = (page, perPage) => (headers) => {        
    return fetch(`${process.env.REACT_APP_BASE_API}/users/paginate/${page}/${perPage}`, {
        headers: createHeaders(headers),
    });
}

const fetchFilteredUsers = (query) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/users/filter/${query}`, {
        headers: createHeaders(headers),
    });
}

const updateUser = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/users/${data._id}`, {
        method:'PATCH',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const createUser = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/users`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const deleteUser = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/users/${id}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

const updateSelf = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/users`, {
        method:'PATCH',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

export {
    fetchUsers,
    fetchFilteredUsers,
    updateUser,
    createUser,
    deleteUser,
    updateSelf,
}