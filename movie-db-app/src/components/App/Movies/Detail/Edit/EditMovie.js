import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { updateMovie } from "../../../../../core/modules/movies/api";
import { route, Routes } from "../../../../../core/routing";
import ErrorAlert from "../../../../Shared/ErrorAlert";
import MovieForm from "../../form/MovieForm"

const EditMovie = ({movie, onUpdate}) => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(updateMovie(data))
            .then((data) => {
                // let parent know data is updated
                onUpdate(data);
                history.push(
                    route(Routes.MoviesDetail, {
                        id: data._id,
                    })
                );
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Edit movie info</h1>

            <ErrorAlert error={error} />

            <MovieForm initialData={movie} onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default EditMovie;