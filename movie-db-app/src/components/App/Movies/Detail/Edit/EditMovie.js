import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { updateMovie, uploadImage } from "../../../../../core/modules/movies/api";
import { route, Routes } from "../../../../../core/routing";
import { useAuth } from "../../../../Auth/AuthContainer";
import ErrorAlert from "../../../../Shared/ErrorAlert";
import EditMovieForm from "../../form/MovieForm"
import {format} from 'date-fns'

const EditMovie = ({movie, onUpdate}) => {

    movie.releaseDate = format(new Date(), 'yyyy')
    const withAuth = useAuthApi();
    const history = useHistory()
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const {user} = useAuth();

    // file upload state
    const [file, setFile] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const fileUpload = new Promise(async (resolve, reject) => {
            if(file) {
                await uploadImage(formData, data, user)
                .then((data) => {
                    resolve(data.link);
                })
                .catch((err) =>{
                    reject(err);
                })
            } else(resolve())
          });

        fileUpload
        .then((link) => {
            if(file) {
                data.coverLink = link
            }
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
        });
    }

    return (
        <>
            <h1 className="mt-3">Edit movie info</h1>

            {
                error && <ErrorAlert error={error.message} />
            }

            <EditMovieForm file={file} setFile={setFile} initialData={movie} onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default EditMovie;