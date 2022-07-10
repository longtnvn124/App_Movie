import React, { useEffect, useState } from "react";
import Movie from "./component/Movie";

const FEATURED_API = "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const IMG_API = "http://image.tmdb.org/t/p/w1280";
const SEARCH_API = "http://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies=(API)=>
  {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });

  }


  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)

      setSearchTerm('');
    }
  }
  const handleOnChage = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className="search" type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChage}
          />

        </form>
      </header>
      <div className="movie-container">

        {movies.length > 0 &&
          movies.map((movie) =>
            <Movie key={movie.id}
              {...movie} />
          )}

      </div>
    </>
  );
}

export default App;
