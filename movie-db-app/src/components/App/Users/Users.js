import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import AdminRoute from '../../Shared/Route/AdminRoute';
import CreateMovie from './Create/CreateMovie';
import MovieDetailContainer from './Detail/MovieDetailContainer';
import UsersOverview from './Overview/UsersOverview';

const Users = () => {
    return (
        <Switch>
            {/* <AdminRoute path={Routes.MoviesCreate}>
                <CreateUser/>
            </AdminRoute>
            <Route path={Routes.MoviesDetail}>
                <MovieDetailContainer />
            </Route> */}
            <AdminRoute path={Routes.users}>
                <UsersOverview />
            </AdminRoute>
            <Redirect to={Routes.Movies} />
        </Switch>
    );
};

export default Users;
