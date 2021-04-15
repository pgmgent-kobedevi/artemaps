import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchDirectors } from '../../../../core/modules/directors/api';
import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../core/routing';
import useAdmin from '../../../../core/hooks/useAdmin';
import DeleteDirector from '../Delete/DeleteDirector';
import DeleteDirectorAndMovies from '../Delete/DeleteDirectorAndMovies';
import { useState } from 'react';
import DeleteButton from '../../../Design/DeleteButton';

const DirectorsOverview = () => {

    const [director, setDirector] = useState();
    const [directorAndMore, setDirectorAndMore] = useState();
    const [info, setInfo] = useState();

    const {
        data: directors,
        error,
        setError,
        refresh,
        isLoading
    } = useFetch(fetchDirectors);

    const admin = useAdmin();

    const onUpdate = () => {
        setDirector(null);
        setDirectorAndMore(null);
        refresh();
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
                info && <Alert color="info">{info}</Alert>
            }
            
            <h1>Directors</h1>

            {
                admin && <Link className='add' to={Routes.DirectorsCreate}>➕</Link>
            }
            <ul>
                {directors.map((director) => (
                    <li key={director._id}>
                        <DeleteButton
                            deleter={() => setDirector(director)}
                        >
                            director
                        </DeleteButton>
                        <DeleteButton
                            deleter={() => setDirectorAndMore(director)}
                        > 
                            director and all movies 
                        </DeleteButton>
                        

                        <Link to={route(Routes.DirectorsDetail, {id: director._id})}>
                            {director.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {
                director && <DeleteDirector
                    director={director}
                    onUpdate={onUpdate}
                    onDismiss={() => setDirector(null)}
                    setError={setError}
                    setInfo={setInfo}
                />  
            }
            {
                directorAndMore && <DeleteDirectorAndMovies
                    director={directorAndMore}
                    onUpdate={onUpdate}
                    onDismiss={() => setDirectorAndMore(null)}
                    setError={setError}
                    setInfo={setInfo}
                />  
            }
        </>
    )

};

export default DirectorsOverview;
