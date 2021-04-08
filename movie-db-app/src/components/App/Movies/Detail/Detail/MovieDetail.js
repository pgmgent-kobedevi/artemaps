// import TimeTracker from '../TimeTracker/TimeTracker';
import { route, Routes } from '../../../../../core/routing';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import ReviewsOverview from '../Reviews/Overview/ReviewsOverview';

const MovieDetail = ({movie}) => {

    return (
        <>
            <h1>{movie.title}</h1>
            <p>Director: {movie.director.firstName} {movie.director.lastName}</p>
            <p>Release year: {format(new Date(movie.releaseDate), 'yyyy')}</p>
            <AdminContainer>
                <Link to={route(Routes.MoviesEdit, {id: movie._id})}>
                    Edit movie
                </Link>
            </AdminContainer>

            <h2>Reviews</h2>

            <ReviewsOverview movieId={movie._id}/>
        </>
    );
};

export default MovieDetail;
