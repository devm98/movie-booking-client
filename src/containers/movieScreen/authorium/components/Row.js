import React from 'react';
import Seat from './Seat';

function Row({ searArr }) {
  return (
    <div style={{ display: 'flex' }}>
      {searArr.map((seat) => (
        <Seat key={seat.number} seatName={`Ghe ${seat.number}`} />
      ))}
    </div>
  );
}

export default Row;
