import { Button, Card, Col, Form, Modal, Spin, Steps } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetDates } from '../../../core/helpers';
import stepsAntd from './steps';

const arrDay = GetDates(7);

function MovieBox(props) {
  const {
    id,
    duration,
    releaseDate,
    movie,
    schedules,
    current,
    visible,
    loading,
    handleSelectedSchedule,
    onChangeSchedule,
    handleShowMovieDetail,
    handleBooking,
    handleCancel,
    next,
    prev,
  } = props;
  const [form] = Form.useForm();

  const steps = stepsAntd(
    arrDay,
    form,
    schedules,
    handleSelectedSchedule,
    onChangeSchedule
  );

  return (
    <>
      <Col className="gutter-row" span={6}>
        <Card
          hoverable
          style={{ cursor: 'pointer' }}
          onClick={() => handleShowMovieDetail(id)}
          bodyStyle={{ padding: 0, margin: 0, lineHeight: 1 }}
          cover={
            <img
              style={{ maxHeight: 380 }}
              alt="example"
              src={`http://localhost:8080/image/movie/${id}.jpg`}
            />
          }
        >
          <div
            className="movie"
            style={{
              display: 'flex',
              fontSize: 16,
              justifyContent: 'space-between',
              padding: '0 15px',
              paddingTop: 15,
            }}
          >
            <p>{duration} phút</p>
            <p>{releaseDate}</p>
          </div>
        </Card>
      </Col>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ flex: '40%' }}>{movie?.title}</h5>
            <Steps current={current}>
              {steps.map((item) => (
                <Steps.Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
        }
        visible={visible}
        bodyStyle={{
          overflowX: 'auto',
          maxHeight: '70vh',
        }}
        width={'90%'}
        style={{
          top: 20,
        }}
        closable={false}
        footer={
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={(e) => next(e)}>
                Chọn thời gian
              </Button>
            )}
            {current === steps.length - 1 && (
              <Link to={`/seat-select/${id}`}>
                <Button onClick={() => handleBooking(id)} type="primary">
                  Tiến hành đặt vé
                </Button>
              </Link>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Trở về
              </Button>
            )}
            <Button type="primary" onClick={() => handleCancel()}>
              Hủy
            </Button>
          </div>
        }
      >
        {loading ? (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Spin />
          </div>
        ) : (
          <Container fluid>
            <div className="steps-content">
              {steps[current].content(movie?.data)}
            </div>
          </Container>
        )}
      </Modal>
    </>
  );
}

export default MovieBox;
