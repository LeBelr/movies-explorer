import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import handleMovieModel from '../../utils/movieModel';
import * as movieApi from '../../utils/MoviesApi';

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));


  // Функция для установки количества фильмов в Movies
  function handleCountMovie() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    const windowWidth = document.documentElement.clientWidth;

    if (foundMovies) {
      if (windowWidth >= 1280) {
        setMovies(foundMovies.slice(0, 12));
        setMoreMovies(3);
      }
      if (windowWidth > 480 && windowWidth < 1280) {
        setMovies(foundMovies.slice(0, 8));
        setMoreMovies(2);
      }
      if (windowWidth <= 480) {
        setMovies(foundMovies.slice(0, 5));
        setMoreMovies(2);
      }
    } else {
      setMoreMovies(0);
      return
    }
  }

  // Функция для показа фильмов при нажатии "Ещё" в Movies
  function handleShowMore() {
    setMovies(foundMovies.slice(0, movies.length + moreMovies));
  }

  // Функция для поиска фильмов в Movies
  function handleShowMovie(movieName, isChecked) {
    if (!localStorage.getItem('allMovies')) {
      setIsLoading(true);
      movieApi.getMovies()
        .then((movies) => {
          const modelMovies = movies.map(handleMovieModel);
          const filterMovies = modelMovies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()));
          const filterShortMovies = isChecked ? (filterMovies.filter((item) => item.duration <= 40)) : filterMovies;
          localStorage.setItem('allMovies', JSON.stringify(modelMovies));
          localStorage.setItem('movieName', movieName);
          localStorage.setItem('foundMovies', JSON.stringify(filterShortMovies));
          localStorage.setItem('isChecked', isChecked);
          setAllMovies(modelMovies);
          setIsLoading(false);
          handleCountMovie();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    } else {
      const filterMovies = allMovies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()));
      const filterShortMovies = isChecked ? (filterMovies.filter((item) => item.duration <= 40)) : filterMovies;
      localStorage.setItem('movieName', movieName);
      localStorage.setItem('foundMovies', JSON.stringify(filterShortMovies));
      localStorage.setItem('isChecked', isChecked);
      handleCountMovie();
    }
  }

  // Функция для отображения лайков
  function isSaved(movie) {
    return savedMovies.some(item => item.id === movie.id);
  }

  function handleSaveMovie(data) {
    localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, data]));
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  }

  function handleDeleteMovie(movie) {
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter(item => String(item.id) !== movie.id)))
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  }

  useEffect(() => {
    localStorage.removeItem('allMovies');
    if (localStorage.getItem('allMovies')) {
      setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
    }
    if (localStorage.getItem('savedMovies')) {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
    }
    if (localStorage.getItem('foundMovies')) {
      handleCountMovie();
    }
    handleShowMovie('');
  }, [])

  window.addEventListener('resize', () => {
    setTimeout(() => {
      handleCountMovie();
    }, 200)
  })

  useEffect(() => {
    if (!foundMovies) {
      return
    }
    if (movies.length === foundMovies.length) {
      setMoreMovies(0)
    }
  }, [movies, foundMovies])

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={
          <Movies
            movies={movies}
            handleShowMovie={handleShowMovie}
            isLoading={isLoading}
            moreMovies={moreMovies}
            handleShowMore={handleShowMore}
            handleSaveMovie={handleSaveMovie}
            handleDeleteMovie={handleDeleteMovie}
            isSaved={isSaved}
          />}
        />
        <Route path="/saved-movies" element={
          <SavedMovies
            movies={savedMovies}
            handleDeleteMovie={handleDeleteMovie}
            isSaved={isSaved}
          />}
        />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </div>
  )
}

export default App;
