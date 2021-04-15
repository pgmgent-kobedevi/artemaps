import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { useCallback } from 'react';
import { Routes } from '../../../../core/routing';
import EditDirector from './Edit/EditDirector';
import DirectorDetail from './Detail/DirectorDetail';
import AdminRoute from '../../../Shared/Route/AdminRoute';
import { fetchDirector } from '../../../../core/modules/directors/api';


const DirectorDetailContainer = () => {

    const { id } = useParams();
    const apiCall = useCallback(() => {
        return fetchDirector(id);
    }, [id])

    // todo error object

    const {
        data: director,
        setData,
        error,
        isLoading
    } = useFetch(apiCall);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <Switch>
                <AdminRoute path={Routes.DirectorsEdit}>
                    <EditDirector director={director} onUpdate={(data) => setData(data)}/>
                </AdminRoute>
                <Route path={Routes.DirectorsDetail}>
                    <DirectorDetail director={director} />
                </Route>
                <Redirect to={Routes.Directors}/>
            </Switch>
        </>
    )
};

export default DirectorDetailContainer;