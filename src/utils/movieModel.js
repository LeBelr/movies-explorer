export default function handleMovieModel(movie) {
  return {
    "country": `${movie.country}`,
    "director": `${movie.director}`,
    "duration": `${movie.duration}`,
    "year": `${movie.year}`,
    "description": `${movie.description}`,
    "image": `https://api.nomoreparties.co${movie.image.url}`,
    "trailerLink": `${movie.trailerLink}`,
    "thumbnail": `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
    "id": `${movie.id}`,
    "nameRU": `${movie.nameRU}`,
    "nameEN": `${movie.nameEN}`
  }
}