import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchDirectors } from '../../../../core/modules/directors/api';
import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useAdmin from '../../../../core/hooks/useAdmin';
import DeleteDirector from '../Delete/DeleteDirector';
import DeleteDirectorAndMovies from '../Delete/DeleteDirectorAndMovies';
import { useState } from 'react';
import AddIcon from '../../../Design/AddIcon';
import DirectorTable from './DirectorTable';

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
        return <Alert color="danger">{error.message}</Alert>;
    }

    return (
        <>

            {   
                info && <Alert color="info">{info}</Alert>
            }
            
            <h1 className='mt-3'>Directors: </h1>

            {
                admin && <Link className='add' to={Routes.DirectorsCreate}><AddIcon/></Link>
            }
            <DirectorTable
                directors={directors}
                deleter={setDirector}
                deleterExtra={setDirectorAndMore}
            />
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
