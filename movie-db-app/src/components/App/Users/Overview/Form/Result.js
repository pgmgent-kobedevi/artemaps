import { useCallback } from "react";
import useFetch from "../../../../../core/hooks/useFetch";
import { fetchFilteredUsers } from "../../../../../core/modules/users/api";
import Alert from "../../../../Design/Alert";
import Spinner from "../../../../Design/Spinner";

const Result = ({result}) => {

    const apiCall = useCallback(() => {
        return fetchFilteredUsers(result);
    }, [result])

    const {
        data: users,
        error,
        isLoading
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <>
        {
            users && (
                <table>
                <thead>
                    <tr>    
                        <th>User ID</th>
                        <th>Username</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.userName}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )
        }
        </>
    )
}

export default Result;