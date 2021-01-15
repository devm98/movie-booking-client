import { Card } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

function TicketDetail({ state }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Vui lòng kiểm tra lại thông tin</Card.Title>
        <hr />
        <Row>
          <Col md="3">
            <img
              alt="phim"
              width="100%"
              src={`http://localhost:8080/images/${state?.movieId}.jpg`}
            />
          </Col>
          <Col md="9">
            <Card.Title>Cinema MovieUpdating Thủ Đức</Card.Title>
            <Card.Text className="mb-2">
              <b>Suất chiếu:</b>{' '}
              {moment(state?.showingTime).utc().format('HH:mm | DD/MM/YYYY')}
            </Card.Text>
            <Card.Text className="mb-2">
              <b>Phòng chiếu:</b> {state?.auditoriumName}
            </Card.Text>
            <Card.Text className="mb-2">
              <b>Ghế đã chọn:</b> {state?.seatSelected}
            </Card.Text>
            <hr />
            <Card.Text className="mb-2">
              <b>Tên phim:</b> {state?.movieName}
            </Card.Text>
            <Card.Text>
              <b>Thời lượng:</b> {state?.movieDuration} phút
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default TicketDetail;
