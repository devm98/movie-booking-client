import { Button, Card, Col, Form, Modal, Radio, Spin, Steps, Tabs } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Col as ColB, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../../state/actions/booking';
import { getMovieDetails } from '../../../core/api/movies';
import { GetDates } from '../../../core/helpers';
import '../style.css';
import { scheduleSelector } from './selector';

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
        movieId: movie.id,
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
        movieId: movie?.id,
      })
    );
    const nextCurrent = current + 1;
    setCurrent(nextCurrent);
  };

  const prev = () => {
    const prevCurrent = current - 1;
    setCurrent(prevCurrent);
  };

  const steps = [
    {
      title: 'Chi tiết phim',
      content: (movie) => (
        <Row>
          <ColB xl={3}>
            <div>
              <img
                width="100%"
                src={`http://localhost:8080/image/movie/${movie?.id}.jpg`}
                alt={'movie'}
              />
            </div>
          </ColB>
          <ColB xl={9}>
            <Table striped hover>
              <tbody>
                <tr>
                  <th width="15%">Thời lượng:</th>
                  <td>{movie.duration} phút</td>
                </tr>
                <tr>
                  <th width="15%">Đạo diễn:</th>
                  <td> {movie.director}</td>
                </tr>
                <tr>
                  <th width="15%">Diễn viên:</th>
                  <td>{movie.actors}</td>
                </tr>
                <tr>
                  <th width="15%">Thể loại:</th>
                  <td>{movie.genre}</td>
                </tr>
                <tr>
                  <th width="15%">Ngày ra mắt:</th>
                  <td>{moment(movie.releaseDate).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <th width="15%">Nội dung:</th>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: movie.description,
                      }}
                    ></div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </ColB>
        </Row>
      ),
    },
    {
      title: 'Chọn ngày và khung giờ',
      content: (movie) => (
        <Tabs
          onChange={(activeKey, movieId) =>
            handleSelectedSchedule(activeKey, (movieId = movie.id))
          }
          defaultActiveKey="1"
        >
          {arrDay.map((day, i) => (
            <Tabs.TabPane tab={day.dateVN} key={day.dateKey}>
              <Form form={form} onValuesChange={onChangeSchedule}>
                {schedules.length > 0 ? (
                  <Form.Item label="Các khung giờ hiện có:" name="timeSchedule">
                    <Radio.Group>
                      {schedules.map((item, i) => {
                        return (
                          <Radio.Button
                            style={{ marginRight: 10 }}
                            key={i}
                            value={item}
                          >
                            {item}
                          </Radio.Button>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                ) : (
                  'Ngày bạn chọn hiện chưa có lịch chiếu'
                )}
              </Form>
            </Tabs.TabPane>
          ))}
        </Tabs>
      ),
    },
  ];

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
            <div className="steps-content">{steps[current].content(movie)}</div>
          </Container>
        )}
      </Modal>
    </>
  );
}

export default MovieBox;
