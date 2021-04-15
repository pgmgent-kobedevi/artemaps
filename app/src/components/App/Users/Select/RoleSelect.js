  
import { useState, useEffect } from 'react';
import Select from '../../../Design/Select';
import useAuthApi from '../../../../core/hooks/useAuthApi';

const RoleSelect = (props) => {
    const withAuth = useAuthApi();

    const [role, setRole] = useState();

    useEffect(() => {
        const roles = [
            {
                role: 'user',
                label: 'User'
            }, {
                role: 'admin',
                label: 'Admin'
            },
        ]
        setRole(roles)
    }, [withAuth]);

    const options = role
        ? role.map((d) => ({ value: d.role, label: d.label }))
        : null;

    return <Select options={options} {...props} />;
};

export default RoleSelect;