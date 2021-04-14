import { useState } from "react";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { updateSelf } from "../../../../core/modules/users/api";
import { useAuth } from "../../../Auth/AuthContainer";
import Alert from "../../../Design/Alert";
import ErrorAlert from "../../../Shared/ErrorAlert";
import UserForm from "./Form/UserForm";

const EditUser = () => {

    const withAuth = useAuthApi();
    const {user} = useAuth()
    const [localUser, setLocalUser] = useState(user)

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
            setLocalUser({
                ...data,
                email: data.email,
                userName: data.userName
            });
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

            <h1>Edit profile:</h1>
            <UserForm
                onSubmit={handleSubmit}
                initialData={localUser}
            />


        </>
    )
}

export default EditUser;