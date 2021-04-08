import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createMovies } from "../../../../core/modules/movies/api";
import { Routes } from "../../../../core/routing";
import ErrorAlert from "../../../Shared/ErrorAlert";
import MovieForm from "../form/MovieForm"

const CreateMovie = () => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(createMovies(data))
            .then(() => {
                history.push(Routes.Movies);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Create movie</h1>

            <ErrorAlert error={error} />

            <MovieForm onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default CreateMovie;