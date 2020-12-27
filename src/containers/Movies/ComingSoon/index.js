import React, { useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import actions from '../../../state/actions/movies';
import { useDispatch, useSelector } from 'react-redux';

const { getComingSoonMovies } = actions;

function ComingSoon() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComingSoonMovies());
  }, [dispatch]);

  const movies = useSelector((state) => state.movies.comingSoon.data);

  return <MovieGrid movies={movies} />;
}

export default ComingSoon;
