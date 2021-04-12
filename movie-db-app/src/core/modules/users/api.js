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

export {
    fetchUsers,
    fetchFilteredUsers,
}