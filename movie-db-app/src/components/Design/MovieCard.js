import { Link } from "react-router-dom";
import { route, Routes } from "../../core/routing";
import Like from "../App/Movies/Like/Like";
import AdminContainer from "../Shared/Admin/AdminContainer";
import DeleteButton from "./DeleteButton";

const MovieCard = ({movie, onUpdate, deleter}) => {

    return (
        <div className='movieCard'>
            <Like 
                onUpdate={onUpdate} 
                movieId={movie._id}
                movie={movie}
            />
            <AdminContainer>
                <DeleteButton deleter={() => deleter(movie)}/>
            </AdminContainer>
            <Link to={route(Routes.MoviesDetail, {id: movie._id})}>
                <img src={`https://mobdev2-moviedbapi.herokuapp.com/uploads/${movie.coverLink}`} alt='Movie poster'/>
                <section>
                    <p>{movie.title}</p>
                </section>
            </Link>
        </div>
    )
};

export default MovieCard;
