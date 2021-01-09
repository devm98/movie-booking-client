import React from 'react';
import { useSelector } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import { loadingComingSoonMovieSelector } from '../selectors';

function ComingSoon(props) {
  const loading = useSelector(loadingComingSoonMovieSelector);

  return <MovieGrid movies={props.comingSoon} loading={loading} {...props} />;
}

export default ComingSoon;
