import { Modal, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { formatCash } from '../../../../core/helpers';
import actions from '../../../../core/state/actions/booking';
import PaymentButton from './components/PaypalButtons';

function Payment(props) {
  const history = useHistory();
  const [paypal, setPaypal] = useState({
    loading: false,
    error: false,
    dataResponse: undefined,
    status: -1,
  });
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { state } = props.location;
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  const handleOkPayment = () => {
    setVisible(false);
    history.push('/');
    return <Redirect to="/" />;
  };

  useEffect(() => {
    if (paypal.status === 'COMPLETED') {
      const { movieId, showingScheduleId, totalPrice, seatIds } = state;
      dispatch(
        actions.bookingTicketAction({
          bookingDate: moment(new Date()).format('YYYY-MM-DD HH:mm'),
          movieId,
          showingScheduleId,
          grandTotal: totalPrice,
          seatIds,
          customerId: userInfo?.id,
        })
      );
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paypal.status]);

  return (
    <>
      <Spin spinning={paypal.loading} size="large" tip="Loading...">
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
                        src={`http://localhost:8080/images/${state?.movieId}.jpg`}
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
                    Tổng tiền của bạn là: {formatCash(state?.totalPrice)}đ
                  </Card.Title>
                  <hr />
                  <Card.Title>Hình thức thanh toán</Card.Title>
                  <PaymentButton
                    paypal={paypal}
                    setPaypal={setPaypal}
                    state={state}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Spin>
      <Modal
        title={<h4>Bạn đã thanh toán thành công</h4>}
        visible={visible}
        onOk={handleOkPayment}
        okText="Quay về trang chủ"
        width={800}
      >
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
      </Modal>
    </>
  );
}

export default Payment;
