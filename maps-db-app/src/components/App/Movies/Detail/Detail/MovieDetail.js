// import TimeTracker from '../TimeTracker/TimeTracker';
import { route, Routes } from '../../../../../core/routing';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import AdminContainer from '../../../../Shared/Admin/AdminContainer';
import ReviewsOverview from '../Reviews/Overview/ReviewsOverview';
import formatMinutesToString from '../../../../../core/modules/movies/utils';
import EditIcon from '../../../../Design/EditIcon';

const MovieDetail = ({movie}) => {

    return (
        <>
            <div className='movieContainer'>
                <div>
                    <img src={movie.coverLink} alt='movie cover'/>
                </div>
                <section className='movieDetails'>
                    <h1 className='detailTitle'>{movie.title}</h1>
                    {
                        movie.director && <p><b>Director: </b>{movie.director.firstName} {movie.director.lastName}</p>
                    }
                    <p><b>Release year: </b>{format(new Date(movie.releaseDate), 'yyyy')}</p>
                    <p><b>Duration: </b>{formatMinutesToString(movie.duration)}</p>
                </section>
            </div>
            <AdminContainer>
                <Link className="edit" to={route(Routes.MoviesEdit, {id: movie._id})}>
                    <EditIcon/>
                </Link>
            </AdminContainer>
            
            <h2 className="mt-4" >Reviews</h2>
            <Link to={route(Routes.MoviesCreateReview, {id: movie._id})} movie={movie}>Add review</Link>
            <ReviewsOverview movieId={movie._id}/>
        </>
    );
};

export default MovieDetail;
