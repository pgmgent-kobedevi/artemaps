import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchUsers } from '../../../../core/modules/users/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import SearchForm from '../../Movies/Overview/Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';

const UsersOverview = () => {
    
    const admin = useAdmin();

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);

    const [query, setQuery] = useState('');

    const apiCall = useCallback(() => {
        return fetchUsers(page, perPage);
    }, [page, perPage])

    const {
        data: users,
        error,
        isLoading
    } = useFetch(apiCall)
    
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
                error && <Alert color="danger">{error.message}</Alert>
            }

            <h1>Users:</h1>

            {
                isLoading && <Spinner />
            }

            {
                users && (
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
                                    <table>
                                        <thead>
                                            <tr>    
                                                <th>User ID</th>
                                                <th>Username</th>
                                                <th>role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { users.users.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user._id}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination 
                                        page={page}
                                        perPage={perPage}
                                        pageAmount={users.pageAmount}
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

export default UsersOverview;
