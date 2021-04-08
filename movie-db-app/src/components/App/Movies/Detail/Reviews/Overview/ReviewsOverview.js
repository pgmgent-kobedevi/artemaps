import { Link } from 'react-router-dom';
import { route, Routes } from '../../../../../../core/routing';
import useFetch from '../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../Design/Spinner';
import Alert from '../../../../../Design/Alert';
import { fetchReviewsByMovie } from '../../../../../../core/modules/reviews/api';
import useAdmin from '../../../../../../core/hooks/useAdmin';
import { useCallback } from 'react';

const ReviewsOverview = ({movieId}) => {
    const fetchReviews = useCallback(() => fetchReviewsByMovie({movieId}), [movieId]);

    const {
        data: reviews,
        error,
        isLoading
    } = useFetch(fetchReviews);

//     const admin = useAdmin();

    if (isLoading) {
        return <Spinner />;
    }

if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
            {/* {
                admin && <Link to={Routes.MoviesCreate}>Add movie</Link>
            } */}
            <ul>
                { reviews.map((review) => (
                    <li key={review._id}>
                        <div>
                            <h3>{review.user.userName}</h3>
                            <p>{review.rating}</p>
                            <p>{review.review}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ReviewsOverview;