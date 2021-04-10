import HeartIcon from "./img/HeartIcon"
import { useLikedMovies } from "../../App";
import { createLikedMovie, deleteLikedMovie, deleteLikedMovieTest } from "../../../../core/modules/likedMovies/api";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { useAuth } from "../../../Auth/AuthContainer";

const Like = ({id, onUpdate, onError}) => {

    const withAuth = useAuthApi();
    const {user} = useAuth();
    const {likedMovies, setLikedMovies} = useLikedMovies();



    // TODO
    // sometimes toRemoveId is undefined
    // sometimes it complains about unique keys even when it has a unique key


    // what a mess!
    // console.log(likedMovies);
    const toggleLike = () => {
        console.log(likedMovies.some((movie) => movie.movieId === id))
        let newArray = likedMovies;
        // if movie is already in liked list
        if(likedMovies.some((movie) => movie.movieId === id)) {
            // TODO remove from liked list
            let toRemoveId;
            newArray = newArray.filter((movie) => {
                console.log(newArray);
                console.log(movie);
                console.log(movie.movie)
                if(movie.movieId === id) {
                    toRemoveId = movie._id;
                }
                return movie.movieId !== id
            });
            // console.log('id ', id);
            console.log(toRemoveId);

            if(onUpdate) {
                onUpdate(newArray);
            }
            setLikedMovies(newArray);
            // TODO convert this to proper delete function
            deleteLikedMovieTest(toRemoveId, user);
        }
        else {
            withAuth(createLikedMovie({
                movieId: id,
            }))
            .then(() => {
                newArray.push({
                    movieId: id,
                    movie:{
                        _id: id,
                    }
                })
                setLikedMovies(newArray);
            })
        }
    }

    // check if user already likes movie or not
    // toggle the like

    return (
        <HeartIcon onClick={toggleLike}/>
    )
};

export default Like;
