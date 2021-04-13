import { useState } from 'react';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import ErrorAlert from '../../../Shared/ErrorAlert';
import UserForm from './UserForm';
import { updateUser, createUser } from '../../../../core/modules/users/api';
import Modal from '../../../Shared/Modal';

const CreateOrEditUser = ({user, onUpdate, onDismiss }) => {
    const withAuth = useAuthApi();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    // const admin = useAdmin();

    const isNew = !user._id;

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(
            isNew
                ? createUser(data)
                : updateUser(data)
        )
            .then((data) => {
                // let parent know data is updated
                onUpdate(data);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    };

    return (
        <Modal
            title={isNew ? 'Create user' : 'Update user'}
            onDismiss={onDismiss}>
            <ErrorAlert error={error} />

            <UserForm
                isNew={isNew}
                onSubmit={handleSubmit}
                initialData={user}
                disabled={isLoading}
            />
        </Modal>
    );
};

export default CreateOrEditUser;