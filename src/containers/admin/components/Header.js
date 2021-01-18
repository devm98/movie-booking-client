import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
  '/admin': 'Quản lý phim',
  '/admin/movies': 'Quản lý phim',
  '/admin/users': 'Quản lý user',
};

function Header({ collapse, onToggle }) {
  const location = useLocation();
  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return (
    <Layout.Header className="site-layout-background components-layout-demo-custom-trigger">
      <div className="d-flex align-items-center">
        {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: onToggle,
        })}
        <Breadcrumb>
          <Breadcrumb.Item>
            {breadcrumbNameMap[location.pathname]}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="d-flex align-items-center">
        Hi! {userInfo.fullName}
        <Avatar
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}
          size="large"
          icon={<UserOutlined />}
        />
      </div>
    </Layout.Header>
  );
}

export default Header;
