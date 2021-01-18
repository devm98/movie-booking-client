import React from 'react';

const BigImage = ({ data }) => (
  <img src={`data:image/jpeg;base64,${data}`} alt="" />
);

export default BigImage;
