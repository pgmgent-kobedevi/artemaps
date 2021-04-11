import useFetch from '../../../../core/hooks/useFetch';
import { fetchLikedMovies } from '../../../../core/modules/likedMovies/api';
import Alert from '../../../Design/Alert';
import MovieCard from '../../../Design/MovieCard';
import Spinner from '../../../Design/Spinner';

const LikedMoviesOverview = () => {

    // retrieve data again to fill in needed virtual fields
    const {
        data: likedMovies,
        setData: setLikedMovies,
        error,
        isLoading
    } = useFetch(fetchLikedMovies);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <h1>Your liked movies:</h1>
            <ul className='movieList'>
                { likedMovies.map((item) => (
                    <li key={item.movieId}>
                        <MovieCard 
                            onUpdate={(data) => setLikedMovies(data)} 
                            movie={item.movie}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
};

export default LikedMoviesOverview;
