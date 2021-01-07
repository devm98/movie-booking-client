/* eslint-disable no-dupe-keys */
import { Button, Divider, notification, Spin } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { formatCash } from '../../../core/helpers';
import {
  dataRoomSelector,
  loadingSeatsBookedSelector,
  seatsBookedSelector,
} from '../selectors';
import useEnhance from '../useEnhance';
import Row from './components/Row';
import Seat from './components/Seat';

function Auditorium() {
  const { id } = useParams();
  const loading = useSelector(loadingSeatsBookedSelector);
  const dataRoom = useSelector(dataRoomSelector);
  const { ticketInfo } = dataRoom;
  const seatsBooked = useSelector(seatsBookedSelector);
  const { seatBookings, handleBookingSeat } = useEnhance();
  const totalPrice = Object.keys(seatBookings).length * ticketInfo?.ticketPrice;

  useEffect(() => {
    if (Object.keys(seatBookings).length > 8) {
      notification.warning({
        message: 'Bạn chỉ được chọn tối đa 8 ghế',
      });
    }
  }, [seatBookings]);

  const seatArr = Object.keys(seatBookings).map((key) => {
    const seatFind = dataRoom?.seatOriginals?.find(
      (seat) => seat?.id === Number(key)
    );
    return `${seatFind.row}${seatFind.number}`;
  });

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
        <div className="ticket__movie d-flex">
          <img
            src={`http://localhost:8080/image/movie/${id}.jpg`}
            alt="movie"
          />
          <div>
            <p>{ticketInfo?.movieName}</p>
            <p>
              <strong>Thời lượng:</strong> {ticketInfo?.movieDuration} phút
            </p>
          </div>
        </div>
        <div className="ticket__main">
          <p>Cinema MovieUpdating Thủ Đức</p>
          <p>
            <strong>Suất chiếu:</strong>{' '}
            {moment(ticketInfo?.showingTime).utc().format('HH:mm | DD/MM/YYYY')}
          </p>
          <p>
            <strong>Phòng chiếu:</strong> {ticketInfo?.auditoriumName}
          </p>
        </div>
        <div className="ticket__total">
          {!isEmpty(seatBookings) && (
            <p>
              <strong>Ghế đã chọn:</strong> {seatArr.join(', ')}
            </p>
          )}

          <p>
            <strong>Giá vé:</strong> {formatCash(ticketInfo?.ticketPrice)}đ
          </p>
          <p>
            <strong>Tổng:</strong> {formatCash(totalPrice)}đ
          </p>
        </div>
        <div className="ticket__action">
          <Link
            to={{
              pathname: '/payment',
              state: {
                ...ticketInfo,
                seatSelected: seatArr.join(', '),
                movieId: id,
                totalPrice: formatCash(totalPrice),
              },
            }}
          >
            <Button className="mb-3" type="primary">
              Xác nhận {'>>'}
            </Button>
          </Link>
          <Button style={{ width: 111 }}>{'<<'} Quay về</Button>
        </div>
      </div>
    </Container>
  );
}

export default Auditorium;
