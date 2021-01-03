import { Divider, Spin } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { Container } from 'react-bootstrap';
import useEnhance from '../useEnhance';
import Row from './components/Row';

function Authorium(props) {
  const {
    seatsBooked,
    dataRoom,
    seatBookings,
    handleBookingSeat,
  } = useEnhance();

  return (
    <Container>
      <div className="text-center">
        <h3>MÀN HÌNH</h3>
      </div>
      <Divider />
      {isEmpty(seatsBooked) ? (
        <Spin size="large" />
      ) : (
        Object.keys(dataRoom?.seats).map((key, index) => {
          const seat = dataRoom?.seats[key];
          return (
            <div
              className="d-flex justify-content-center align-items-center"
              key={index}
            >
              <p className="mr-3">
                <b>{key}</b>
              </p>
              <Row
                searArr={seat}
                seatsBooked={seatsBooked}
                handleBookingSeat={handleBookingSeat}
                seatBookings={seatBookings}
              />
            </div>
          );
        })
      )}
    </Container>
  );
}

export default Authorium;
