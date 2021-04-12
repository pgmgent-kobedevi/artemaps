import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchMovies } from '../../../../core/modules/movies/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import MovieCard from '../../../Design/MovieCard';
import SearchForm from './Form/SearchForm';
import Result from './Form/Result';
import { useState } from 'react';

const MoviesOverview = () => {
    const {
        data: movies,
        error,
        isLoading
    } = useFetch(fetchMovies);
    
    const [query, setQuery] = useState('');

    const admin = useAdmin();

    const onSubmit = (query) => {
        setQuery(query.search)
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            {
                admin && <Link className="add" to={Routes.MoviesCreate}>➕</Link>
            }
            <h1>Movies:</h1>
            <SearchForm
                onSubmit={onSubmit}
                setQuery={setQuery}
            />
            {
                query && <Result result={query}/>
            }
            {
                !query && (
                    <ul className='movieList'>
                        { movies.map((movie) => (
                            <li key={movie._id}>
                                <MovieCard movie={movie}/>
                            </li>
                        ))}
                    </ul>
                )
            }
        </>
    )
};

export default MoviesOverview;
