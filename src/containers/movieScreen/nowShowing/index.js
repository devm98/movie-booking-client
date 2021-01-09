import React from 'react';
import { useSelector } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import { loadingNowShowingMovieSelector } from '../selectors';

function NowShowing(props) {
  const loading = useSelector(loadingNowShowingMovieSelector);

  return <MovieGrid loading={loading} movies={props.nowShowing} {...props} />;
}

export default NowShowing;
