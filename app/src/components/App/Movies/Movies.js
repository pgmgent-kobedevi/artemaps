import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import MoviesOverview from './Overview/MoviesOverview';
import AdminRoute from '../../Shared/Route/AdminRoute';
import CreateMovie from './Create/CreateMovie';
import MovieDetailContainer from './Detail/MovieDetailContainer';

const Movies = () => {
    return (
        <Switch>
            <AdminRoute path={Routes.MoviesCreate}>
                <CreateMovie/>
            </AdminRoute>
            <Route path={Routes.MoviesDetail}>
                <MovieDetailContainer />
            </Route>
            <Route path={Routes.Movies}>
                <MoviesOverview />
            </Route>
            <Redirect to={Routes.Movies} />
        </Switch>
    );
};

export default Movies;
