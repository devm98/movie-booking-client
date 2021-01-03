import { Checkbox } from 'antd';
import React from 'react';

function Seat({ seatName, checked, value, onChange }) {
  return (
    <div
      style={{
        padding: 5,
        borderRadius: 8,
        boxShadow: '0 0 5px 0 #999999',
        margin: 8,
      }}
    >
      <Checkbox
        onChange={onChange}
        name={value}
        value={value}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        checked={checked}
      >
        {seatName}
      </Checkbox>
    </div>
  );
}

export default Seat;
