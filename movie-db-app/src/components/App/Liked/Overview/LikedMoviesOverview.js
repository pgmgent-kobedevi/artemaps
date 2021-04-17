import { useState } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchLikedMovies } from '../../../../core/modules/likedMovies/api';
import Alert from '../../../Design/Alert';
import MovieCard from '../../../Design/MovieCard';
import Spinner from '../../../Design/Spinner';
import DeleteMovie from '../../Movies/Delete/DeleteMovie';

const LikedMoviesOverview = () => {

    const [deleteMovie, setDeleteMovie] = useState();
    const [info, setInfo] = useState();

    // retrieve data again to fill in needed virtual fields
    const {
        data: likedMovies,
        setData: setLikedMovies,
        error,
        setError,
        refresh,
        isLoading
    } = useFetch(fetchLikedMovies);

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

            <h1 className='mt-3'>Your liked movies:</h1>
            <ul className='movieList'>
                { likedMovies.map((item) => (
                    <li key={item.movieId}>
                        <MovieCard 
                            deleter={setDeleteMovie}
                            onUpdate={(data) => setLikedMovies(data)} 
                            movie={item.movie}
                        />
                    </li>
                ))}
            </ul>
            {
                deleteMovie && (
                    <DeleteMovie
                        movie={deleteMovie}
                        onUpdate={onUpdate}
                        onDismiss={() => setDeleteMovie(null)}
                        setError={setError}
                        setInfo={setInfo}
                    />
                )
            }
        </>
    )
};

export default LikedMoviesOverview;
