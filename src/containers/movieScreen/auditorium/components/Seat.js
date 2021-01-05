import { Checkbox } from 'antd';
import React from 'react';

function Seat({
  seatName,
  checked,
  checkedDefault,
  value,
  styles,
  styleChecked,
  onChange,
}) {
  return (
    <div
      style={{
        padding: 5,
        borderRadius: 8,
        boxShadow: '0 0 5px 0 #999999',
        margin: 8,
        border: checkedDefault
          ? 'thin solid orangered'
          : 'thin solid limegreen',
        userSelect: checkedDefault ? 'none' : 'auto',
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles,
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
          ...styleChecked,
        }}
        disabled={checkedDefault}
        checked={checked}
      >
        {seatName}
      </Checkbox>
    </div>
  );
}

export default Seat;
