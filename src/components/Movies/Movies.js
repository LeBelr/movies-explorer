import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

export default function Movies({ movies, handleShowMovie, isLoading, handleShowMore, moreMovies, loggedIn, handleSaveMovie, handleDeleteMovie, isSaved }) {

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm handleShowMovie={handleShowMovie} isSavedMovie={false} />
        <MoviesCardList
          isSavedMovie={false}
          movies={movies}
          isLoading={isLoading}
          moreMovies={moreMovies}
          handleShowMore={handleShowMore}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          isSaved={isSaved}
        />
      </main>
      <Footer />
    </>
  )
}