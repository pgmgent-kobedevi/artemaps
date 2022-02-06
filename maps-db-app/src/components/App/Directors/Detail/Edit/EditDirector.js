import { useState } from "react";
import { useHistory } from "react-router";
import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { updateDirector } from "../../../../../core/modules/directors/api";
import { route, Routes } from "../../../../../core/routing";
import ErrorAlert from "../../../../Shared/ErrorAlert";
import DirectorForm from "../../form/DirectorForm"

const EditDirector = ({director, onUpdate}) => {

    const withAuth = useAuthApi();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(updateDirector(data))
            .then((data) => {
                // let parent know data is updated
                onUpdate(data);
                history.push(
                    route(Routes.DirectorsDetail, {
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
            <h1>Edit Director</h1>

            {
                error && <ErrorAlert error={error.message} />
            }

            <DirectorForm initialData={director} onSubmit={handleSubmit} disabled={isLoading}/>
        </>
    )
}

export default EditDirector;