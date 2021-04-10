// import TimeTracker from '../TimeTracker/TimeTracker';
import { route, Routes } from '../../../../../core/routing';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import ReviewsOverview from '../Reviews/Overview/ReviewsOverview';
import formatMinutesToString from '../../../../../core/modules/movies/utils';

const MovieDetail = ({movie}) => {

    return (
        <>
            <h1>{movie.title}</h1>
            {
                movie.director && <p>Director: {movie.director.firstName} {movie.director.lastName}</p>
            }
            <p>Release year: {format(new Date(movie.releaseDate), 'yyyy')}</p>
            <p>Duration: {formatMinutesToString(movie.duration)}</p>
            <AdminContainer>
                <Link className="edit" to={route(Routes.MoviesEdit, {id: movie._id})}>
                    📝
                </Link>
            </AdminContainer>
            
            <h2>Reviews</h2>
            <Link to={route(Routes.MoviesCreateReview, {id: movie._id})} movie={movie}>Add review</Link>
            <ReviewsOverview movieId={movie._id}/>
        </>
    );
};

export default MovieDetail;
