import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Divider, Typography, Tabs } from 'antd';
import { GetDates } from '../../utils/helpers';
import actions from '../../actions/booking';
import { useDispatch, useSelector } from 'react-redux';
import MovieGrid from '../Movies/components/MovieGrid';
import { movieSelector } from './selector';

const { Title } = Typography;
const { TabPane } = Tabs;

function Booking() {
  const arrDay = GetDates(7);
  const dispatch = useDispatch();
  const movies = useSelector(movieSelector);

  useEffect(() => {
    dispatch(actions.getMovieSchedule({ date: arrDay[0].dateKey, type: '1' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectedSchedule = (key) => {
    dispatch(actions.getMovieSchedule({ date: key, type: '1' }));
  };

  return (
    <>
      <Divider orientation="center">
        <Title type="warning" level={2}>
          Đặt vé
        </Title>
      </Divider>
      <Container>
        <Tabs
          onChange={(activeKey) => handleSelectedSchedule(activeKey)}
          defaultActiveKey="1"
          tabPosition="left"
        >
          {arrDay.map((day, i) => (
            <TabPane tab={day.dateVN} key={day.dateKey}>
              <MovieGrid movies={movies} />
            </TabPane>
          ))}
        </Tabs>
      </Container>
    </>
  );
}

export default Booking;
