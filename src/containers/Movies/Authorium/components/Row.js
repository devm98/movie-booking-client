import React from 'react';
import Seat from './Seat';

function Row(props) {
  return (
    <div style={{ display: 'flex' }}>
      <Seat seatName="Ghe 1" />
    </div>
  );
}

export default Row;
