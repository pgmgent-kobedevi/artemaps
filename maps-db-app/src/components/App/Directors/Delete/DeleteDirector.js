import useAuthApi from "../../../../core/hooks/useAuthApi";
import { deleteDirector } from "../../../../core/modules/directors/api";
import Button from "../../../Design/Button";
import Modal from "../../../Shared/Modal";

const DeleteDirector = ({setError, director, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteDirector(director._id))
        .then((data) => {
            onUpdate();
            setInfo(`Director: '${data.director.name}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete director'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteDirector;