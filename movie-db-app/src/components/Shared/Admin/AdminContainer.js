import isAdmin from "../../../core/modules/auth/utils";
import { useAuth } from "../../Auth/AuthContainer";

const AdminContainer = ({children}) => {
    const {user} = useAuth();
    const admin = isAdmin(user);

    if(!admin) {
        return null;
    }

    return children;
}

export default AdminContainer;