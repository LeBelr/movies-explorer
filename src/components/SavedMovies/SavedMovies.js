import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

export default function SavedMovies({ movies, loggedIn, isSaved, handleDeleteMovie }) {
  const [filterMovies, setFilterMovies] = useState([]);

  function handleShowSavedMovie(movieName, isChecked) {
    const filterMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()));
    const filterShortMovies = isChecked ? (filterMovies.filter((item) => item.duration <= 40)) : filterMovies;
    setFilterMovies(filterShortMovies);
  }

  useEffect(() => {
    setFilterMovies(filterMovies.filter(filterMovies => movies.some(movie => movie.id === filterMovies.id)));
  }, [movies])

  useEffect(() => {
    setFilterMovies(movies)
  }, [])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm handleShowMovie={handleShowSavedMovie} isSavedMovie={true}/>
        <MoviesCardList
          isSavedMovie={true}
          movies={filterMovies}
          handleDeleteMovie={handleDeleteMovie}
          isSaved={isSaved}
        />
      </main>
      <Footer />
    </>
  )
}