import React from 'react'

const MovieCard = ({ movie:
    { title, vote_average, poster_path, release_date, original_languagr } }) => {
    return (
        <div className="movie-card">
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                    : `/no-movie.png`}
                alt={title} />

            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star icon" />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default MovieCard
