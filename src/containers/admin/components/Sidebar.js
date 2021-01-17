import {
  NodeExpandOutlined,
  PlaySquareOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar({ collapse }) {
  return (
    <Sider
      className="sidebar-admin"
      trigger={null}
      collapsible
      collapsed={collapse}
    >
      <div className="logo" style={{ minHeight: 32, margin: 14 }}>
        <p
          style={{
            textAlign: 'center',
            color: '#ffffff',
            marginBottom: 0,
            fontWeight: 600,
            fontSize: 'large',
          }}
        >
          MOVIE ADMIN
        </p>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        theme="dark"
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item icon={<PlaySquareOutlined />} key="1">
          <Link to="/admin/movies">Quản lý Phim</Link>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined />} key="2">
          <Link to="/admin/users">Quản lý Người Dùng</Link>
        </Menu.Item>
        <Menu.Item icon={<NodeExpandOutlined />} key="3">
          <Link to="/admin/roles">Quản lý Người Dùng</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
