import MovieScreen from './MovieScreen';
import './style.css';
import useEnhance from './useEnhance';
import React from 'react';

export default () => {
  const changeProps = useEnhance();
  return <MovieScreen {...changeProps} />;
};
