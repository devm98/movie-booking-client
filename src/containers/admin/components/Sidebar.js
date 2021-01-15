import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';

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
        defaultOpenKeys={['sub1']}
        theme="dark"
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          className="ant-sub-custom"
          key="sub1"
          icon={<UserOutlined />}
          title="subnav 1"
        >
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          className="ant-sub-custom"
          key="sub2"
          icon={<LaptopOutlined />}
          title="subnav 2"
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          className="ant-sub-custom"
          key="sub3"
          icon={<NotificationOutlined />}
          title="subnav 3"
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
