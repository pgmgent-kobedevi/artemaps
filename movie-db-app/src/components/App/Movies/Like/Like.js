import HeartIcon from "./img/HeartIcon"
import UnHeartIcon from "./img/UnHeartIcon"
import { useLikedMovies } from "../../App";
import { createLikedMovie, deleteLikedMovieByMovieId } from "../../../../core/modules/likedMovies/api";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { useAuth } from "../../../Auth/AuthContainer";

const Like = ({movieId, onUpdate, movie}) => {

    const withAuth = useAuthApi();
    const {user} = useAuth();
    const {likedMovies, setLikedMovies} = useLikedMovies();

    const toggleLike = () => {
        let tempArray = likedMovies;
        // if movie is already in liked list
        if(likedMovies.some((movie) => movie.movieId === movieId)) {
            tempArray = tempArray.filter((item) => {
                if(item.movieId === movieId) {
                    deleteLikedMovieByMovieId(movieId, user);
                }
                return item.movieId !== movieId
            });

            // if theres an onUpdate function update dom
            if(onUpdate) {
                onUpdate(tempArray);
            }
            // update local likedMovies
            setLikedMovies(tempArray);
        }
        else {
            withAuth(createLikedMovie({
                movieId: movieId,
            }))
            .then(() => {
                tempArray.push({
                    movieId: movieId,
                    movie:{
                        ...movie,
                    }
                })
                setLikedMovies(tempArray);
            })
        }
    }

    if(likedMovies.some((movie) => movie.movieId === movieId)) {
        return <UnHeartIcon onClick={toggleLike}/>
    } else {
        return <HeartIcon onClick={toggleLike}/>
    }
};

export default Like;
