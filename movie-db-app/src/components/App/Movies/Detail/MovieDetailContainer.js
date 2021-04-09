import { fetchMovie } from '../../../../core/modules/movies/api';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { useCallback } from 'react';
import { Routes } from '../../../../core/routing';
import EditMovie from './Edit/EditMovie';
import MovieDetail from './Detail/MovieDetail';
import AdminRoute from '../../../Shared/Route/AdminRoute';
import CreateReview from './Reviews/Create/CreateReview';


const MovieDetailContainer = () => {

    const { id } = useParams();
    const apiCall = useCallback(() => {
        return fetchMovie(id);
    }, [id])

    // todo error object

    const {
        data: movie,
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
                <AdminRoute path={Routes.MoviesEdit}>
                    <EditMovie movie={movie} onUpdate={(data) => setData(data)}/>
                </AdminRoute>
                <Route path={Routes.MoviesCreateReview}>
                    <CreateReview movie={movie} />
                </Route>
                <Route path={Routes.MoviesDetail}>
                    <MovieDetail movie={movie} />
                </Route>
                <Redirect to={Routes.Movies}/>
            </Switch>
        </>
    )
};

export default MovieDetailContainer;