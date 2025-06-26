import MovieList from '../components/movies/MovieList';

const Movies = () => {
  return (
    <div className="movies-page d-flex justify-content-center align-items-center mt-5">
      <h1>Movies</h1>
      <MovieList />
    </div>
  );
};

export default Movies;