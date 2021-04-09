import useFetch from '../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../Design/Spinner';
import Alert from '../../../../../Design/Alert';
import { fetchReviewsByMovie } from '../../../../../../core/modules/reviews/api';
import { useCallback } from 'react';

const ReviewsOverview = ({movieId}) => {
    const fetchReviews = useCallback(() => fetchReviewsByMovie({movieId}), [movieId]);

    const {
        data: reviews,
        error,
        isLoading
    } = useFetch(fetchReviews);

    if (isLoading) {
        return <Spinner />;
    }

if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    return (
        <>
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