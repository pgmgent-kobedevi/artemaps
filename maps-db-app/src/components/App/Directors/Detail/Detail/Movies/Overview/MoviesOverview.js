import useFetch from '../../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../../Design/Spinner';
import Alert from '../../../../../../Design/Alert';
import { fetchMoviesByDirector } from '../../../../../../../core/modules/directors/api';
import { useCallback, useState } from 'react';
import DeleteMovieFromDirector from '../../Delete/DeleteMovieFromDirector'
import MovieCard from '../../../../../../Design/MovieCard';

const MoviesOverview = ({directorId}) => {

    const [deleteMovie, setDeleteMovie] = useState();
    const [info, setInfo] = useState();
    
    const fetchMovies = useCallback(() => fetchMoviesByDirector({directorId}), [directorId]);
    
    const {
        data: movies,
        error,
        setError,
        refresh,
        isLoading
    } = useFetch(fetchMovies);

    const onUpdate = () => {
        setDeleteMovie(null);
        refresh();
    }

    if (isLoading) {
        return <Spinner />;
    }

if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <>
            {
                info && <Alert color="info">{info}</Alert>
            }
            <ul className='movieList'>
                { movies.map((movie) => (
                    <li key={movie._id}>
                        <MovieCard deleter={setDeleteMovie} movie={movie}/>
                    </li>
                ))}
            </ul>
            {
                deleteMovie && 
                <DeleteMovieFromDirector
                    movie={deleteMovie}
                    onUpdate={onUpdate}
                    onDismiss={() => setDeleteMovie(null)}
                    setError={setError}
                    setInfo={setInfo}
                />
            }
        </>
    )
}

export default MoviesOverview;