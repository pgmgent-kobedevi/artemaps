import useFetch from '../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../Design/Spinner';
import Alert from '../../../../../Design/Alert';
import { fetchReviewsByMoviePagination } from '../../../../../../core/modules/reviews/api';
import { useCallback, useState } from 'react';
import Pagination from '../../../../../Design/Pagination';
// import Pagination from './Pagination';

const ReviewsOverview = ({movieId}) => {
    // pagination
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const fetchReviews = useCallback(() => {
        return fetchReviewsByMoviePagination({movieId}, page, perPage)
    }, [movieId, page, perPage]);
    
    const handlePageClick = (page) => {
        setPage(page);
    }

    const handlePerPageClick = (perPage) => {
        setPerPage(perPage);
    }

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

    if(reviews){
        return (
            <>
                { reviews.reviews.map((review) => (
                    <div key={review._id}>
                        <h3>{review.user.userName}</h3>
                        <p>{review.rating}</p>
                        <p>{review.review}</p>
                    </div>
                ))}
                <Pagination
                    page={page}
                    perPage={perPage}
                    pageAmount={reviews.pageAmount}
                    perPageClick={handlePerPageClick}
                    onClick={handlePageClick}
                />
                
            </>
        )
    }

}

export default ReviewsOverview;