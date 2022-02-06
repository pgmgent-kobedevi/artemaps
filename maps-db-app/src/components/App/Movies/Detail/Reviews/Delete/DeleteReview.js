import useAuthApi from "../../../../../../core/hooks/useAuthApi";
import { deleteReview } from "../../../../../../core/modules/reviews/api";
import Button from "../../../../../Design/Button";
import Modal from "../../../../../Shared/Modal";

const DeleteReview = ({setError, review, onDismiss, onUpdate}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = () =>{
        withAuth(deleteReview(review._id))
        .then(() => {
            onUpdate();
        })
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
            <Button color="danger" onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteReview;