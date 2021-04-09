import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../../../core/hooks/useAuthApi";
import { createReview } from "../../../../../../core/modules/reviews/api";
import { route, Routes } from "../../../../../../core/routing";
import ErrorAlert from "../../../../../Shared/ErrorAlert";
import ReviewForm from "../form/ReviewForm"

const CreateReview = ({movie}) => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(createReview(data, movie._id))
            .then(() => {
                history.push(route(Routes.MoviesDetail, {id: movie._id}));
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Create review for {movie.title}</h1>

            <ErrorAlert error={error} />

            <ReviewForm onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default CreateReview;