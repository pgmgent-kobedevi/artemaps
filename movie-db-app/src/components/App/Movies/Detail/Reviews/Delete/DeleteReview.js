import useAuthApi from "../../../../../../core/hooks/useAuthApi";
import { deleteMovie } from "../../../../../../core/modules/movies/api";
import Button from "../../../../../Design/Button";
import Modal from "../../../../../Shared/Modal";

const DeleteReview = ({setError, review, onDismiss, onUpdate}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = () =>{
        withAuth(deleteMovie(review._id))
        .catch((e) => {
            setError(e)
        })
        onUpdate();
    }

    return(
        <Modal
            title={'Delete review'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteReview;