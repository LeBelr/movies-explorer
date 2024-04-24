import './MoviesCard.css';

export default function MoviesCard({ movie, isSavedMovie, onMoviesLike, onMoviesDelete, isSaved }) {

  function changeDuration() {
    if (movie.duration >= 60) {
      return (Math.trunc(movie.duration / 60)) + "ч " + (movie.duration % 60) + "м"
    }
    if (movie.duration < 60) {
      return movie.duration + "м"
    }
  }

  function handleSaveMovie() {
    onMoviesLike(movie);
  }

  function handleDeleteMovie() {
    onMoviesDelete(movie);
  }

  return (
    <li className="movie-card">
      <a className="movie-card__link" href={movie.trailerLink} target="blank">
        <img className="movie-card__image" src={movie.image} alt="Постер" />
      </a>
      <div className="movie-card__like-box">
        <h2 className="movie-card__name">{movie.nameRU}</h2>
        {isSavedMovie ? (
          <button className="movie-card__like hover-button movie-card__like_type_delete" type="button" onClick={handleDeleteMovie}></button>
        ) :
          (
            <button className={isSaved(movie) ? (`movie-card__like hover-button movie-card__like_active`) : (`movie-card__like hover-button`)} type="button" onClick={isSaved(movie) ? handleDeleteMovie : handleSaveMovie}></button>
          )}
      </div>
      <p className="movie-card__duration">{changeDuration()}</p>
    </li >
  )
}