const MovieCard = ({movie}) => {
    return (
        <div className='movieCard'>
            <img src={movie.coverLink} alt='Movie poster'/>
            <section>
                <p>{movie.title}</p>
            </section>
        </div>
    )
};

export default MovieCard;
