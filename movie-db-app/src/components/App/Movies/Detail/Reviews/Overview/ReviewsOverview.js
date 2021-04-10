import useFetch from '../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../Design/Spinner';
import Alert from '../../../../../Design/Alert';
import { fetchReviewsByMovie } from '../../../../../../core/modules/reviews/api';
import { useCallback, useState } from 'react';
import Pagination from './Pagination';

const ReviewsOverview = ({movieId}) => {
    const fetchReviews = useCallback(() => fetchReviewsByMovie({movieId}), [movieId]);
    // pagination
    const [page, setPage] = useState(1);
    
    const handlePageClick = (page) => {
        setPage(page);
    }

    const {
        data: reviews,
        error,
        isLoading
    } = useFetch(fetchReviews);

    // review pagination
    const MAX_PER_PAGE = 4;



    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error}</Alert>;
    }

    if(reviews){
        const pagedReviews = reviews.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE);
        return (
            <>
                    { pagedReviews.map((review) => (
                        <div key={review._id}>
                            <h3>{review.user.userName}</h3>
                            <p>{review.rating}</p>
                            <p>{review.review}</p>
                        </div>
                    ))}
                
                <Pagination
                    total={reviews.length}
                    maxPerPage = {MAX_PER_PAGE}
                    currentPage={page}
                    onClick={handlePageClick}
                />
            </>
        )
    }

}

export default ReviewsOverview;