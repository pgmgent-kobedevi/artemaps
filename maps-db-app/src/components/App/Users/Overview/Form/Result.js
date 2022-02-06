import { useCallback } from "react";
import useFetch from "../../../../../core/hooks/useFetch";
import { fetchFilteredUsers } from "../../../../../core/modules/users/api";
import Alert from "../../../../Design/Alert";
import Spinner from "../../../../Design/Spinner";
import Table from "../../../../Design/Table";
import DeleteUser from "../Delete/DeleteUser";

const Result = ({result, setCurrentUser, deleteUser, setDeleteUser}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredUsers(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, deleteUser])

    const {
        data: users,
        error,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    const handleUpdate = () => {
        setDeleteUser(null);
        refresh();
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <>
        {
            users && (
                <Table
                    users={users}
                    setter={setCurrentUser}
                    deleter={setDeleteUser}
                />
            )
        }

        {
            deleteUser && (
                <DeleteUser
                    user={deleteUser}
                    onUpdate={handleUpdate}
                    onDismiss={() => setDeleteUser(null)}>
                </DeleteUser>
            )
        }
        </>
    )
}

export default Result;