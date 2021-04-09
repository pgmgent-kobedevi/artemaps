import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { createDirector } from "../../../../core/modules/directors/api";
import { Routes } from "../../../../core/routing";
import ErrorAlert from "../../../Shared/ErrorAlert";
import DirectorForm from "../form/DirectorForm"

const CreateDirector = () => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(createDirector(data))
            .then(() => {
                history.push(Routes.Directors);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    return (
        <>
            <h1>Create director</h1>

            <ErrorAlert error={error} />

            <DirectorForm onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default CreateDirector;