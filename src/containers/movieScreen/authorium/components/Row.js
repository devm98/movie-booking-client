import React from 'react';
import Seat from './Seat';

function Row({ searArr, seatsBooked, seatBookings, handleBookingSeat }) {
  const mergeSeat = { ...seatsBooked, ...seatBookings };
  console.log(mergeSeat);
  return (
    <div style={{ display: 'flex' }}>
      {searArr.map((seat) => {
        return (
          <Seat
            key={seat.number}
            checked={mergeSeat[seat.id] || false}
            value={seat.id}
            onChange={handleBookingSeat}
            seatName={`Ghế ${seat.number}`}
          />
        );
      })}
    </div>
  );
}

export default Row;
