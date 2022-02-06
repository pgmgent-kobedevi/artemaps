import { useCallback } from "react";
import { useAuth } from "../../components/Auth/AuthContainer";
import ApiError from "../error/ApiError";
import AppError from "../error/AppError";
import { handleApiResult, withToken}  from "../utils/api";

const useAuthApi = () => {

    const {user, logout} = useAuth();

    const withAuth = useCallback((promise) => {
        return new Promise((resolve, reject) => {
            withToken(promise, user.token)
            .then(handleApiResult)
            .then((data) => resolve(data))
            .catch((err) => {
                if(err instanceof ApiError) {
                    if (err.isUnauthorized()) {
                        logout();
                        return;
                    } else {
                        reject(err)
                    }
                } else {
                    reject(new AppError(err));
                }
            })
        });
    }, [logout, user.token]);

    return withAuth;
}

export default useAuthApi;