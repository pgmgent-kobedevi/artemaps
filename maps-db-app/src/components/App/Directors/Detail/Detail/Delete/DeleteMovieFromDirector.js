import useAuthApi from "../../../../../../core/hooks/useAuthApi";
import { deleteMovie } from "../../../../../../core/modules/movies/api";
import Button from "../../../../../Design/Button";
import Modal from "../../../../../Shared/Modal";

const DeleteMovieFromDirector = ({setError, movie, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = async() =>{
        await withAuth(deleteMovie(movie._id))
        .then((data) => {
            onUpdate();
            setInfo(`Movie: '${data.movie.title}' was deleted.`);
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={'Delete movie'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteMovieFromDirector;