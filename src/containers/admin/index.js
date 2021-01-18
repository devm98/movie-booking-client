import React from 'react';
import Admin from './Admin';
import './style.css';
import useEnhance from './useEnhance';

export default () => {
  const changeProps = useEnhance();
  return <Admin {...changeProps} />;
};
