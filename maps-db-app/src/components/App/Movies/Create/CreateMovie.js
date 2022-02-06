import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createMovies, uploadImage } from "../../../../core/modules/movies/api";
import { Routes } from "../../../../core/routing";
import ErrorAlert from "../../../Shared/ErrorAlert";
import MovieForm from "../form/MovieForm"
import { useAuth } from "../../../Auth/AuthContainer";

const CreateMovie = () => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    
    const {user} = useAuth();

    // file upload state
    const [file, setFile] = useState();

    const handleSubmit = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const fileUpload = new Promise(async (resolve, reject) => {
            await uploadImage(formData, data, user)
            .then((data) => {
                resolve(data.link);
            })
            .catch((err) =>{
                reject(err);
            })
          });

        fileUpload
        .then((link) => {
            data.coverLink = link
            withAuth(createMovies(data))
            .then(async() => {
                history.push(Routes.Movies);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
        })
        .catch((err) => {
            setError(err);
        });
        
    }

    return (
        <>
            <h1>Create movie</h1>

            {
                error && <ErrorAlert error={error.message} />
            }

            <MovieForm file={file} setFile={setFile} onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default CreateMovie;