import React from 'react';
import { Row } from 'antd';
import MovieBox from './MovieBox';
import moment from 'moment';

function MovieGrid({ movies, ...rest }) {
  return (
    <Row gutter={[16, 24]}>
      {movies?.map((movie) => (
        <MovieBox
          key={movie.id}
          id={movie.id}
          title={movie?.title}
          duration={movie?.duration}
          releaseDate={moment(movie?.releaseDate, 'DD-MM-YYYY')}
          {...rest}
        />
      ))}
    </Row>
  );
}

export default MovieGrid;
