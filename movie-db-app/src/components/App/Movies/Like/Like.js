import HeartIcon from "./img/HeartIcon"
import { useAuth } from "../../../Auth/AuthContainer";
import { useLikedMovies } from "../../App";
import { createLikedMovie } from "../../../../core/modules/likedMovies/api";
import useAuthApi from "../../../../core/hooks/useAuthApi";
import { useState } from "react";

const Like = ({id}) => {

    const withAuth = useAuthApi();
    const {likedMovies, setLikedMovies} = useLikedMovies();

    const toggleLike = () => {
        console.log(likedMovies);
        if(likedMovies.some((movie) => movie.movieId === id)) {
            console.log('allready liked');
            // TODO unlike
        } else {
            withAuth(createLikedMovie({
                movieId: id,
            }))
            .then(() => {
                const newArray = likedMovies;
                newArray.push({
                    movieId: id,
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
