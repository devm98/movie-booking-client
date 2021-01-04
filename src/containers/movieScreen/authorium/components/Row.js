import React from 'react';
import Seat from './Seat';

function Row({ searArr, seatsBooked, seatBookings, handleBookingSeat, keys }) {
  const mergeSeat = { ...seatsBooked, ...seatBookings };
  return (
    <div style={{ display: 'flex' }}>
      {searArr.map((seat) => {
        return (
          <Seat
            key={seat.number}
            checked={mergeSeat[seat.id] || false}
            checkedDefault={seatsBooked[seat.id]}
            value={seat.id}
            onChange={handleBookingSeat}
            seatName={`${keys}${seat.number}`}
          />
        );
      })}
    </div>
  );
}

export default Row;
