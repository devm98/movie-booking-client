import { Button, Card, Col, Form, Modal, Spin, Steps } from 'antd';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovieDetails } from '../../../core/api/movies';
import { GetDates } from '../../../core/helpers';
import actions from '../../../state/actions/booking';
import '../style.css';
import { scheduleSelector } from './selector';
import stepsAntd from './steps';

const arrDay = GetDates(7);

function MovieBox(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const schedules = useSelector(scheduleSelector);
  const [dated, setDated] = useState(arrDay[0].dateKey);
  const { id, duration, releaseDate } = props;
  const [movie, setMovie] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const handleShowMovieDetail = () => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
        if (res.status === 200) {
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
    setVisible(true);
  };

  const onChangeSchedule = (data) => {
    const showingDate = `${dated} ${data.timeSchedule}:00`;
    dispatch(
      actions.getRooms({
        movieId: movie?.data?.id,
        showingDate,
      })
    );
  };

  const handleSelectedSchedule = (key, movieId) => {
    setDated(key);
    dispatch(actions.getMovieSchedule({ date: key, type: '0', movieId }));
  };

  const handleCancel = () => {
    setVisible(false);
    setLoading(true);
  };

  const next = () => {
    dispatch(
      actions.getMovieSchedule({
        date: arrDay[0].dateKey,
        type: '0',
        movieId: movie?.data?.id,
      })
    );
    const nextCurrent = current + 1;
    setCurrent(nextCurrent);
  };

  const prev = () => {
    const prevCurrent = current - 1;
    setCurrent(prevCurrent);
  };

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
          onClick={() => handleShowMovieDetail()}
          bodyStyle={{ padding: 0, margin: 0, lineHeight: 1 }}
          cover={
            <img
              height={380}
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
                <Button type="primary">Tiến hành đặt vé</Button>
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
