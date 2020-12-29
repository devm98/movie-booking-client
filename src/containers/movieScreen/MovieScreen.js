import { Divider, Layout, Tabs, Typography } from 'antd';
import React from 'react';
import { Container } from 'react-bootstrap';
import ComingSoon from './comingSoon';
import NowShowing from './nowShowing';
import './style.css';

const { Title } = Typography;

function MovieScreen() {
  return (
    <Layout.Content>
      <img
        width="100%"
        src={require('../../assets/images/banner/slide-1.jpg')}
        alt=""
      />
      <Divider orientation="center">
        <Title type="warning" level={2}>
          Lịch chiếu
        </Title>
      </Divider>
      <Container>
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Phim đang chiếu" key="1">
            <NowShowing />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim sắp chiếu" key="2">
            <ComingSoon />
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </Layout.Content>
  );
}

export default MovieScreen;
