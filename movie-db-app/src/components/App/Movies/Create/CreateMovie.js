import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createMovies, uploadImage } from "../../../../core/modules/movies/api";
import { Routes } from "../../../../core/routing";
import ErrorAlert from "../../../Shared/ErrorAlert";
import MovieForm from "../form/MovieForm"
import axios from 'axios';
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
        data.coverLink = file.name;
        // const options = {
        //     method:'POST',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`,
        //     },
        //     body: formData,
        // }
        // delete options.headers['Content-Type'];

        // fetch(`${process.env.REACT_APP_BASE_API}/uploads`, options)
        // .then((message) => {
        //     console.log(message);
        // })
        // .catch((err) => {
        //     console.log('error', err);
        // });
            
        withAuth(createMovies(data))
        .then(async() => {
            history.push(Routes.Movies);
            await uploadImage(formData, user)
            .catch((err) => {
                setError(err);
            });
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        })
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