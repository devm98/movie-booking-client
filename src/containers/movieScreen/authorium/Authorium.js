/* eslint-disable no-dupe-keys */
import { Divider, Spin } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  dataRoomSelector,
  loadingSeatsBookedSelector,
  seatsBookedSelector,
} from '../selectors';
import useEnhance from '../useEnhance';
import Row from './components/Row';
import Seat from './components/Seat';

function Authorium(props) {
  const { id } = useParams();
  const loading = useSelector(loadingSeatsBookedSelector);
  const dataRoom = useSelector(dataRoomSelector);
  const { ticketInfo } = dataRoom;
  const seatsBooked = useSelector(seatsBookedSelector);
  const { seatBookings, handleBookingSeat } = useEnhance();

  console.log(ticketInfo);

  return (
    <Container className="auditorium__container">
      <div className="text-center">
        <h3
          style={{
            background: '#2196f3',
            background: '-webkit-linear-gradient(to right, #005c97, #363795)',
            background: 'linear-gradient(to right, #005c97, #363795)',
            color: 'white',
            padding: '10px 0',
          }}
        >
          MÀN HÌNH
        </h3>
      </div>
      <Divider />
      {loading ? (
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
                keys={key}
                seatsBooked={seatsBooked}
                handleBookingSeat={handleBookingSeat}
                seatBookings={seatBookings}
              />
            </div>
          );
        })
      )}
      <Divider />
      <div className="booking__rule d-flex align-items-center justify-content-center">
        <span>Ghế đã chọn</span>{' '}
        <Seat
          styles={{ marginRight: 15 }}
          styleChecked={{ userSelect: 'none' }}
          seatName="GHẾ"
          checked={true}
        />
        <span>Ghế đã đặt</span>{' '}
        <Seat
          checkedDefault={true}
          styles={{ marginRight: 15 }}
          styleChecked={{ userSelect: 'none' }}
          seatName="GHẾ"
          checked={true}
        />
        <span>Ghế trống</span>{' '}
        <Seat styleChecked={{ userSelect: 'none' }} seatName="GHẾ" />
      </div>
      <Divider />
      <div className="ticket__detail d-flex align-items-center">
        <div className="ticket__movie">
          <img
            width="50%"
            src={`http://localhost:8080/image/movie/${id}.jpg`}
            alt="movie"
          />
          <p>{ticketInfo?.movieName}</p>
          <p>Thời lượng: {ticketInfo?.movieDuration} phút</p>
        </div>
        <div className="ticket__main">
          <p>Cinema MovieUpdating Thủ Đức</p>
          <p>Suat chieu: {ticketInfo?.showingTime}</p>
          <p>Phong chieu: {ticketInfo?.auditoriumName}</p>
        </div>
        <div className="ticket__total">
          <p>Giá vé: {ticketInfo?.ticketPrice}đ</p>
          <p>Tổng: {ticketInfo?.ticketPrice}đ</p>
        </div>
      </div>
    </Container>
  );
}

export default Authorium;
