import React, { useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import actions from '../../../actions/movies';
import { useDispatch, useSelector } from 'react-redux';

const { getComingSoonMovies } = actions;

function ComingSoon(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComingSoonMovies());
  }, [dispatch]);

  const movies = useSelector((state) => state.movies.comingSoon.data);

  const propsMovieGrid = {
    movies,
  };

  return <MovieGrid {...propsMovieGrid} />;
}

export default ComingSoon;
