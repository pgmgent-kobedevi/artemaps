import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchDirectors } from '../../../../core/modules/directors/api';
import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../core/routing';
import useAdmin from '../../../../core/hooks/useAdmin';

const DirectorsOverview = () => {
    const {
        data: directors,
        error,
        isLoading
    } = useFetch(fetchDirectors);

    const admin = useAdmin();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            <h1>Directors</h1>
            {
                admin && <Link className='add' to={Routes.DirectorsCreate}>➕</Link>
            }
            <ul>
                {directors.map((director) => (
                    <li key={director._id}>
                        <Link to={route(Routes.DirectorsDetail, {id: director._id})}>
                            {director.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )

};

export default DirectorsOverview;
