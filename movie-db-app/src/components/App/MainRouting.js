import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './Movies/Movies';
// import Clients from './Clients/Clients';
import { Routes } from '../../core/routing';

const MainRouting = () => {
    return (
        <Switch>
            <Route path={Routes.Movies}>
                <Movies />
            </Route>
            {/* <Route path={Routes.Clients}>
                <Clients />
            </Route> */}
            <Redirect to={Routes.Movies} />
        </Switch>
    );
};

export default MainRouting;
