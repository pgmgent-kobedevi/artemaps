import { createHeaders } from "../../utils/api";

const fetchReviewsByMovie = ({movieId}) => (headers) => {

    return fetch(`${process.env.REACT_APP_BASE_API}/movies/${movieId}/reviews`, {
        headers: createHeaders(headers),
    });

}

export {
    fetchReviewsByMovie,
}