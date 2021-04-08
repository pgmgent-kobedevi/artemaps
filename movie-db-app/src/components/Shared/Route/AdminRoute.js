import { Route } from "react-router";
import isAdmin from "../../../core/modules/auth/utils";
import { useAuth } from "../../Auth/AuthContainer";


const AdminRoute = ({path, children}) => {
    const { user } = useAuth();

    const allowed = isAdmin(user);

    if(!allowed) {
        return null;
    }

    return (
        <Route path={path}>
            {children}
        </Route>
    )
}

export default AdminRoute;