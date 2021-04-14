import useFetch from '../../../../../../core/hooks/useFetch';
import Spinner from '../../../../../Design/Spinner';
import Alert from '../../../../../Design/Alert';
import { fetchReviewsByMoviePagination } from '../../../../../../core/modules/reviews/api';
import { useCallback, useState } from 'react';
import Pagination from '../../../../../Design/Pagination';
import DeleteReview from '../Delete/DeleteReview';
// import Button from '../../../../../Design/Button';
import AdminContainer from '../../../../../Shared/Admin/AdminContainer';
import DeleteButton from '../../../../../Design/DeleteButton';

const ReviewsOverview = ({movieId}) => {
    // pagination
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [deleteReview, setDeleteReview] = useState();

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
        setError,
        isLoading,
        refresh,
    } = useFetch(fetchReviews);

    const onUpdate = () => {
        setDeleteReview(null);
        refresh();
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <Alert color="danger">{error.message}</Alert>;
    }

    if(reviews){
        return (
            <>
                { reviews.reviews.map((review) => (
                    <div key={review._id}>
                        <h3>{review.user.userName}</h3>
                        <p>{review.rating}</p>
                        <p>{review.review}</p>
                        <AdminContainer>
                            <DeleteButton deleter={() => setDeleteReview(review)}/>
                        </AdminContainer>
                    </div>
                ))}
                <Pagination
                    page={page}
                    perPage={perPage}
                    pageAmount={reviews.pageAmount}
                    perPageClick={handlePerPageClick}
                    onClick={handlePageClick}
                />
                {
                    deleteReview && (
                        <DeleteReview
                            review={deleteReview}
                            setError={setError}
                            onUpdate={onUpdate}
                            onDismiss={() => setDeleteReview(null)}>
                        </DeleteReview>
                    )
                }
                
            </>
        )
    }

}

export default ReviewsOverview;