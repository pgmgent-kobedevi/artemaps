import useFetch from '../../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../../Design/Spinner';
import Alert from '../../../../../../Design/Alert';
import { fetchMoviesByDirector } from '../../../../../../../core/modules/directors/api';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../../../../core/routing';
import MovieCard from '../../../../../../Design/MovieCard';

const MoviesOverview = ({directorId}) => {
    const fetchMovies = useCallback(() => fetchMoviesByDirector({directorId}), [directorId]);

    const {
        data: movies,
        error,
        isLoading
    } = useFetch(fetchMovies);

    if (isLoading) {
        return <Spinner />;
    }

if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <ul className='movieList'>
                { movies.map((movie) => (
                    <li key={movie._id}>
                        <Link to={route(Routes.MoviesDetail, {id: movie._id})}>
                            <MovieCard movie={movie}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MoviesOverview;