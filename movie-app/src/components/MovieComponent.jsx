import React from 'react';

const MovieComponent = ({ movie: { Title, Year, Poster, Type, imdbID } }) => {
  return (
    <div className='movie-card'>
      <img
        src={Poster !== 'N/A' ? Poster : './No-Poster.png'}
        alt={Title}
      />

      <div className='mt-4'>
        <h3 className='text-white'>{Title}</h3>

        <div className='content'>
          <p className='year'>{Year || 'N/A'}</p>
          <span>•</span>
          <p className='lang'>{Type || 'movie'}</p>
          <span>•</span>
          <a
            className='text-blue-400 underline text-sm'
            href={`https://www.imdb.com/title/${imdbID}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
