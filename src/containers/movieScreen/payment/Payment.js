import moment from 'moment';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import PaymentButton from './components/PaypalButtons';

function Payment(props) {
  const { state } = props.location;

  return (
    <Container>
      <h4>Thanh toán</h4>
      <Row>
        <Col md="8">
          <Card>
            <Card.Body>
              <Card.Title>Vui lòng kiểm tra lại thông tin</Card.Title>
              <hr />
              <Row>
                <Col md="3">
                  <img
                    alt="phim"
                    width="100%"
                    src={`http://localhost:8080/image/movie/${state?.movieId}.jpg`}
                  />
                </Col>
                <Col md="9">
                  <Card.Title>Cinema MovieUpdating Thủ Đức</Card.Title>
                  <Card.Text className="mb-2">
                    <b>Suất chiếu:</b>{' '}
                    {moment(state?.showingTime)
                      .utc()
                      .format('HH:mm | DD/MM/YYYY')}
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
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Card.Title className="text-success">
                Tổng tiền của bạn là: {state?.totalPrice}đ
              </Card.Title>
              <hr />
              <Card.Title>Hình thức thanh toán</Card.Title>
              <PaymentButton />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
