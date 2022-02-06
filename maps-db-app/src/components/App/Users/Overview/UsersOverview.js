import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchUsers } from '../../../../core/modules/users/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import SearchForm from '../../Movies/Overview/Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';
import AddButton from '../../../Design/AddButton';
import CreateOrEditUser from '../Form/CreateOrEditUser';
import Table from '../../../Design/Table';
import DeleteUser from './Delete/DeleteUser';

const UsersOverview = () => {
    
    const admin = useAdmin();

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [currentUser, setCurrentUser] = useState();
    const [deleteUser, setDeleteUser] = useState();
    const [info, setInfo] = useState();

    const [query, setQuery] = useState('');

    const apiCall = useCallback(() => {
        return fetchUsers(page, perPage);
    }, [page, perPage])

    const {
        data: users,
        error,
        isLoading,
        refresh,
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

    const handleCreateUser = () => {
        setCurrentUser({});
    };

    const onUpdate = () => {
        setCurrentUser(null);
        setDeleteUser(null);
        refresh();
    }

    return (
        <>
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

            <h1 className='mt-3'>Users:</h1>

            {
                isLoading && <Spinner />
            }

            {
                users && (
                    <>

                        {
                            info && <Alert color="info">{info}</Alert>
                        }

                        {
                            admin && 
                            <AddButton adder={() => handleCreateUser()}/>
                        }
                        
                        <SearchForm
                            onSubmit={onSubmit}
                            setQuery={setQuery}
                        />
                        {
                            query && 
                                <Result 
                                    result={query} 
                                    setCurrentUser={setCurrentUser} 
                                    onUpdate={onUpdate} 
                                    deleteUser={deleteUser} 
                                    setDeleteUser={setDeleteUser}
                                />
                        }
                        {
                            !query && (
                                <>
                                    <Table
                                        users={users.users}
                                        setter={setCurrentUser}
                                        deleter={setDeleteUser}
                                    />
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
                        {
                            currentUser && (
                                <CreateOrEditUser
                                    user={currentUser}
                                    onUpdate={onUpdate}
                                    onDismiss={() => setCurrentUser(null)}
                                />
                            )
                        }
                        {
                            deleteUser && (
                                <DeleteUser
                                    user={deleteUser}
                                    onUpdate={onUpdate}
                                    onDismiss={() => setDeleteUser(null)}
                                    setInfo={setInfo}
                                />
                            )
                        }
                        
                        
                    </>
                )
            }
        </>
    )
};

export default UsersOverview;
