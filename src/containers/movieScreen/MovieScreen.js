import { Divider, Layout, Tabs, Typography } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import ComingSoon from './comingSoon';
import NowShowing from './nowShowing';
import './style.css';

const { Title } = Typography;

function MovieScreen(props) {
  const {
    movie,
    current,
    comingSoon,
    nowShowing,
    schedules,
    visible,
    loadingDetail,
    isSelected,
    dataRoom,
    seatsBooked,
    seatBookings,
    handleShowMovieDetail,
    onChangeSchedule,
    handleSelectedSchedule,
    next,
    prev,
    handleBooking,
    handleBookingSeat,
    handleTabClick,
  } = props;

  const propsMovie = {
    movie,
    current,
    comingSoon,
    nowShowing,
    schedules,
    visible,
    isSelected,
    loadingDetail,
    dataRoom,
    seatsBooked,
    seatBookings,
    handleShowMovieDetail,
    onChangeSchedule,
    handleSelectedSchedule,
    next,
    prev,
    handleBooking,
    handleBookingSeat,
  };

  return (
    <Layout.Content>
      <img
        width="100%"
        src={require('../../assets/images/banner/slide-1.jpg')}
        alt=""
      />
      <Divider orientation="center">
        <Title type="warning" level={2}>
          Danh sách phim
        </Title>
      </Divider>
      <Container>
        <Tabs defaultActiveKey="1" centered onTabClick={handleTabClick}>
          <Tabs.TabPane tab="Phim đang chiếu" key="1">
            <NowShowing {...propsMovie} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim sắp chiếu" key="2">
            <ComingSoon {...propsMovie} />
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </Layout.Content>
  );
}

export default MovieScreen;
