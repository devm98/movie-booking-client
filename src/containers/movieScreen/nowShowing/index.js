import React from 'react';
import MovieGrid from '../components/MovieGrid';

function NowShowing(props) {
  return <MovieGrid movies={props.nowShowing} {...props} />;
}

export default NowShowing;
