import { Layout } from 'antd';
import React, { useState } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { AdminPrivateRoute } from '../../../shared/routes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MovieManagement from '../movieManagement';

const { Content } = Layout;

function Dashboard(props) {
  const { path } = useRouteMatch();

  const [collapse, setCollapse] = useState(false);

  const onToggle = () => setCollapse(!collapse);

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar collapse={collapse} />
      <Layout className="site-layout" style={{ position: 'relative' }}>
        <Header collapse={collapse} onToggle={onToggle} />
        <Content
          className="site-layout-background"
          style={{
            margin: '16px 24px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <AdminPrivateRoute
              path={`${path}/movies`}
              component={MovieManagement}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
