import React, { useEffect } from 'react';
import actions from '../../../actions/movies';
import MovieGrid from '../components/MovieGrid';
import { useDispatch, useSelector } from 'react-redux';

const { getNowShowingMovies } = actions;

function NowShowing(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNowShowingMovies());
  }, [dispatch]);

  const movies = useSelector((state) => state?.movies?.nowShowing?.data);

  const propsMovieGrid = {
    movies,
  };

  return <MovieGrid {...propsMovieGrid} />;
}

export default NowShowing;
