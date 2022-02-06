import { useState } from "react";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateSelf } from "../../../../core/modules/users/api";
import storage from "../../../../core/storage";
import Alert from "../../../Design/Alert";
import ErrorAlert from "../../../Shared/ErrorAlert";
import UserForm from "./Form/UserForm";

const EditUser = () => {

    const withAuth = useAuthApi();
    const [localUser, setLocalUser] = useState(storage.getUserVariableData());

    const [message, setMessage] = useState();
    const [errors, setErrors] = useState();

    // const {
    //     data: likedMovies,
    //     error,
    //     isLoading
    // } = useFetch(fetchLikedMovies);

    const handleSubmit = (data) => {
        withAuth(updateSelf(data))
        .then((data) => {
            storage.storeUserVariableData(data);
            setLocalUser(storage.getUserVariableData());
            setMessage(data);
        })
        .catch((err) => {
            setErrors(err);
        })
    };

    return (
        <>
            {
                message && (
                    <Alert color='secondary'>Profile updated successfully</Alert>
                )
            }
            {
                errors && (
                    <ErrorAlert error={errors}></ErrorAlert>
                )
            }

            <h1 className='mt-3'>Edit profile:</h1>
            <UserForm
                onSubmit={handleSubmit}
                initialData={localUser}
            />


        </>
    )
}

export default EditUser;