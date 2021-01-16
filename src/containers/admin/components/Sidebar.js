import {
  NodeExpandOutlined,
  PlaySquareOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
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
        <SubMenu
          className="ant-sub-custom"
          key="sub1"
          icon={<PlaySquareOutlined />}
          title="Quản lý phim"
        >
          <Menu.Item key="1">Phim đang chiếu</Menu.Item>
          <Menu.Item key="2">Phim sắp chiếu</Menu.Item>
          <Menu.Item key="3">Suất chiếu</Menu.Item>
        </SubMenu>
        <Menu.Item icon={<UserOutlined />} key="4">
          <Link to="/admin/users">Quản lý người dùng</Link>
        </Menu.Item>
        <Menu.Item icon={<NodeExpandOutlined />} key="5">
          Quản lý phân quyền
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
