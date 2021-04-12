import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchMovies, fetchMoviesPaginated } from '../../../../core/modules/movies/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import MovieCard from '../../../Design/MovieCard';
import SearchForm from './Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';

const MoviesOverview = () => {
    
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);

    const apiCall = useCallback(() => {
        return fetchMoviesPaginated(page, perPage);
    }, [page, perPage])

    const {
        data: movies,
        error,
        isLoading
    } = useFetch(apiCall);
    
    const [query, setQuery] = useState('');

    const admin = useAdmin();

    const onSubmit = (query) => {
        setQuery(query.search)
    }

    const handlePageClick = (page) => {
        setPage(page);
    }

    const handlePerPageClick = (perPage) => {
        setPerPage(perPage);
    }

    return (
        <>
            {
                error && <Alert color="danger">{error}</Alert>
            }

            <h1>Movies:</h1>

            {
                isLoading && <Spinner />
            }

            {
                movies && (
                    <>

                        {
                            admin && <Link className="add" to={Routes.MoviesCreate}>➕</Link>
                        }
                        
                        <SearchForm
                            onSubmit={onSubmit}
                            setQuery={setQuery}
                        />
                        {
                            query && <Result result={query}/>
                        }
                        {
                            !query && (
                                <>
                                    <ul className='movieList'>
                                        { movies.movies.map((movie) => (
                                            <li key={movie._id}>
                                                <MovieCard movie={movie}/>
                                            </li>
                                        ))}
                                    </ul>
                                    <Pagination 
                                        page={page}
                                        perPage={perPage}
                                        pageAmount={movies.pageAmount}
                                        perPageClick={handlePerPageClick}
                                        onClick={handlePageClick}
                                    />
                                </>
                            )
                        }
                        
                        
                    </>
                )
            }
        </>
    )
};

export default MoviesOverview;
