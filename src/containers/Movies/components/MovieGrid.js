import React from 'react';
import { Row } from 'antd';
import MovieBox from './MovieBox';
import moment from 'moment';

function MovieGrid(props) {
  const { movies } = props;

  return (
    <Row gutter={[16, 24]}>
      {movies?.map((movie) => (
        <MovieBox
          key={movie.id}
          id={movie.id}
          title={movie?.title}
          duration={movie?.duration}
          releaseDate={moment(movie?.releaseDate).format('DD/MM/YYYY')}
        />
      ))}
    </Row>
  );
}

export default MovieGrid;
