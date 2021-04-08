import { useAuth } from "../../components/Auth/AuthContainer";
import isAdmin from "../modules/auth/utils";

const useAdmin = () => {
    const {user} = useAuth();
    return isAdmin(user);
}

export default useAdmin;