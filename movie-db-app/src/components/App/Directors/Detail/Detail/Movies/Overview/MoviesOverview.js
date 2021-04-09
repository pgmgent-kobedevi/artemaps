import useFetch from '../../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../../Design/Spinner';
import Alert from '../../../../../../Design/Alert';
import { fetchMoviesByDirector } from '../../../../../../../core/modules/directors/api';
import { useCallback } from 'react';

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
            <ul>
                { movies.map((movie) => (
                    <li key={movie._id}>
                        <div>
                            <h3>{movie.title}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default MoviesOverview;