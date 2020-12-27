import React, { useEffect } from 'react';
import actions from '../../../state/actions/movies';
import MovieGrid from '../components/MovieGrid';
import { useDispatch, useSelector } from 'react-redux';

const { getNowShowingMovies } = actions;

function NowShowing(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNowShowingMovies());
  }, [dispatch]);

  const movies = useSelector((state) => state?.movies?.nowShowing?.data);

  return <MovieGrid movies={movies} />;
}

export default NowShowing;
