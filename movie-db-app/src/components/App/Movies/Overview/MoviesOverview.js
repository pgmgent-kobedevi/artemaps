import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchMovies } from '../../../../core/modules/movies/api';
import useAdmin from '../../../../core/hooks/useAdmin';

const MoviesOverview = () => {
    const {
        data: movies,
        error,
        isLoading
    } = useFetch(fetchMovies);

    const admin = useAdmin();

    if (isLoading) {
        return <Spinner />;
    }

if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            {
                admin && <Link to={Routes.MoviesCreate}>Add movie</Link>
            }
            <ul>
                { movies.map((movie) => (
                    <li key={movie._id}>
                        <Link to={route(Routes.MoviesDetail, {id: movie._id})}>
                            { movie.title }
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
};

export default MoviesOverview;
