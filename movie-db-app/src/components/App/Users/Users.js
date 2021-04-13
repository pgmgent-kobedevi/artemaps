import { Redirect, Route, Switch } from 'react-router-dom';
import isAdmin from '../../../core/modules/auth/utils';
import { Routes } from '../../../core/routing';
import { useAuth } from '../../Auth/AuthContainer';
import AdminRoute from '../../Shared/Route/AdminRoute';
import EditUser from './Edit/EditUser'
import UsersOverview from './Overview/UsersOverview';

const Users = () => {
    const { user } = useAuth();
    if(!isAdmin(user)) {
        return (
            <Switch>
                <Route path={Routes.UsersEdit}>
                    <EditUser />
                </Route>
                <Redirect to={Routes.UsersEdit} />
            </Switch>
        );
    }

    return (
        <Switch>
            <AdminRoute path={Routes.Users}>
                <UsersOverview />
            </AdminRoute>
            <Redirect to={Routes.UsersEdit} />
        </Switch>
    )
};

export default Users;
