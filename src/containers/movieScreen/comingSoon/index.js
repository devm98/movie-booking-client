import React from 'react';
import MovieGrid from '../components/MovieGrid';

function ComingSoon(props) {
  return <MovieGrid movies={props.comingSoon} {...props} />;
}

export default ComingSoon;
