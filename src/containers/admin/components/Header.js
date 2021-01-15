import React from 'react';
import { Avatar, Breadcrumb, Layout } from 'antd';
import {
  AntDesignOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

function Header({ collapse, onToggle }) {
  return (
    <Layout.Header className="site-layout-background components-layout-demo-custom-trigger">
      <div className="d-flex align-items-center">
        {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: onToggle,
        })}
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Avatar icon={<AntDesignOutlined />} />
    </Layout.Header>
  );
}

export default Header;
