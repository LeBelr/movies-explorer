import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

export default function MoviesCardList({ movies, isSavedMovie, isLoading, handleShowMore, moreMovies, handleSaveMovie, handleDeleteMovie, isSaved }) {
  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

  if (isLoading) {
    return (<Preloader />)
  }

  return (
    <section className={`movies-cards ${isSavedMovie ? "movies-cards_type_saved" : ""}`} aria-label="Список фильмов">
      {!foundMovies ?
        ("")
        :
        movies.length === 0 ? (<p className="movies-cards__empty">Ничего не найдено</p>) :
          (<ul className="movies-cards__list">
            {movies.map((item) =>
              <MoviesCard
                movie={item}
                key={item.id}
                onMoviesLike={handleSaveMovie}
                onMoviesDelete={handleDeleteMovie}
                isSaved={isSaved}
                isSavedMovie={isSavedMovie}
              />)}
          </ul>
          )}
      {isSavedMovie || !foundMovies || moreMovies === 0 ? "" : (<button className="movies-cards__button hover-button" type="button" onClick={handleShowMore}>Ещё</button>)}
    </section>
  )
}