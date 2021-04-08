  
import { useState, useEffect } from 'react';
import Select from '../../../Design/Select';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { fetchDirectors } from '../../../../core/modules/directors/api';

const DirectorSelect = (props) => {
    const withAuth = useAuthApi();

    const [directors, setDirectors] = useState();

    useEffect(() => {
        withAuth(fetchDirectors())
            .then((data) => setDirectors(data))
            .catch((error) => {
                // todo
            });
    }, [withAuth]);

    const options = directors
        ? directors.map((d) => ({ value: d._id, label: d.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default DirectorSelect;