import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import DirectorsOverview from './Overview/DirectorsOverview';
import CreateDirector from './Create/CreateDirector';
import DirectorDetailContainer from './Detail/DirectorDetailContainer';
import AdminRoute from '../../Shared/Route/AdminRoute';

const Directors = () => {
    return (
        <Switch>
            <AdminRoute path={Routes.DirectorsCreate}>
                <CreateDirector/>
            </AdminRoute>
            <Route path={Routes.DirectorsDetail}>
                <DirectorDetailContainer/>
            </Route>
            <Route path={Routes.Directors}>
                <DirectorsOverview />
            </Route>
            <Redirect to={Routes.Directors} />
        </Switch>
    );
};

export default Directors;
