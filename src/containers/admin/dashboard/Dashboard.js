import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { AdminPrivateRoute } from '../../../shared/routes';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MovieManagement from '../movieManagement';
import UserManagement from '../userManagement';

const { Content } = Layout;

function Dashboard(props) {
  const { path } = useRouteMatch();
  const location = useLocation();

  const [collapse, setCollapse] = useState(false);
  const onToggle = () => setCollapse(!collapse);

  useEffect(() => {
    if (
      location.pathname === '/admin' ||
      location.pathname === '/admin/movies'
    ) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, [location.pathname]);

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
            <AdminPrivateRoute
              path={`${path}/users`}
              component={UserManagement}
            />
            <AdminPrivateRoute path="/" component={MovieManagement} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
