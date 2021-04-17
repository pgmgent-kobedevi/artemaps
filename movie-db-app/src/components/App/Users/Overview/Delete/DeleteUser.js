import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { deleteUser } from "../../../../../core/modules/users/api";
import Button from "../../../../Design/Button";
import Modal from "../../../../Shared/Modal";

const DeleteUser = ({user, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = () =>{
        withAuth(deleteUser(user._id))
        .then(() => {
            setInfo('User deleted');
            onUpdate();
        })
    }

    return(
        <Modal
            title={'Delete user'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteUser;