import { Checkbox } from 'antd';
import React from 'react';

function Seat({ seatName }) {
  return (
    <div>
      <Checkbox>{seatName}</Checkbox>
    </div>
  );
}

export default Seat;
