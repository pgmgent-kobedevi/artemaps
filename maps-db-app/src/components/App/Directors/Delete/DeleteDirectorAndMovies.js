import useAuthApi from "../../../../core/hooks/useAuthApi";
import { deleteDirectorAndMovies } from "../../../../core/modules/directors/api";
import Button from "../../../Design/Button";
import Modal from "../../../Shared/Modal";

const DeleteDirectorAndMovies = ({setError, director, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteDirectorAndMovies(director._id))
        .then((data) => {
            onUpdate();
            setInfo(`Director: '${data.director.name}' and all of his movies were deleted`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete director and all of his movies'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteDirectorAndMovies;