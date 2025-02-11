import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieComponent from './components/MovieComponent'
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deBouncedTerm, setDeBouncedTerm] = useState('');

  useDebounce(() => setDeBouncedTerm(searchTerm), 700, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
      throw new Error('NAHHH MAN');
      }

      const data = await response.json();

      if(data.Response === 'false'){
        setErrorMsg(data.Error || 'Failed to fetch movies....');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    } catch (error) {
      console.log(`Error found : ${error}`);
      setErrorMsg('Error fetching movies. Please try again later or now, idc');
    } finally{
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchMovies(deBouncedTerm);
  }, [deBouncedTerm])
  

  return (
    <main>
    <div className='pattern'/>

    <div className='wrapper'>
      <header>
        <img src="hero.png" alt="Hero banner" />
        <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy to watch</h1>
        <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
      </header>

      <section className='all-movies'>
        <h2 className='mt-[40px]'>Popular Movies</h2>

        {
          isLoading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className='text-red-500'>{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieComponent key={movie.id} movie = {movie} />
              )
              )}
            </ul>
          )
        }
      </section>

    </div>
    </main>
  )
}

export default App