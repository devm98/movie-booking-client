import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Modal,
  Radio,
  Spin,
  Steps,
  Tabs,
} from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Col as ColB, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../actions/booking';
import { getMovieDetails, getMovieRecommends } from '../../../api/movies';
import { GetDates } from '../../../utils/helpers';
import '../style.css';
import { scheduleSelector, auditoriumSelector } from './selector';
import MovieGrid from './MovieGrid';
import MovieRoom from './MovieRoom';

const arrDay = GetDates(7);

function MovieBox(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const schedules = useSelector(scheduleSelector);
  const audi = useSelector(auditoriumSelector);
  const [dated, setDated] = useState('');
  const { id, duration, releaseDate } = props;
  const [movie, setMovie] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [movieRecommends, setMovieRecommends] = useState({});
  const [loadingRe, setLoadingRe] = useState(true);
  console.log(audi);

  const onChangeSchedule = (data) => {
    dispatch(
      actions.getRooms({
        movieId: movie.id,
        date: dated,
        timeShowing: data.timeSchedule,
      })
    );
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
      title: 'Đặt vé',
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
              </Form>
              {/* <MovieRoom /> */}
            </Tabs.TabPane>
          ))}
        </Tabs>
      ),
    },
    {
      title: 'Đặt vé thành công',
      content: (movie) => <div></div>,
    },
  ];

  const handleShowMovieDetail = () => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
        if (res.status === 200) {
          setLoading(false);
        }
      })

      // recommend film
      .catch((e) => console.log(e));
    getMovieRecommends(id)
      .then((res) => {
        setMovieRecommends(res.data);
        if (res.status === 200) {
          setLoadingRe(false);
        }
      })
      .catch((e) => console.log(e));

    setVisible(true);
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
              // <div>
              <Button type="primary" onClick={(e) => next(e)}>
                Tiến hành đặt vé
              </Button>

              // </div>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => handleCancel()}>
                Done
              </Button>
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
            <Divider orientation="left">
              <h4 style={{ color: 'red' }}>Có thể bạn sẽ thích</h4>
            </Divider>
            <div>
              {loadingRe ? (
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  <Spin />
                </div>
              ) : (
                <div>
                  <MovieGrid movies={movieRecommends} />
                </div>
              )}
            </div>
          </Container>
        )}
      </Modal>
    </>
  );
}

export default MovieBox;
