import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import actions from '../../../core/state/actions/auth';

const breadcrumbNameMap = {
  '/admin': 'Quản lý phim',
  '/admin/movies': 'Quản lý phim',
  '/admin/users': 'Quản lý user',
};

function Header({ collapse, onToggle }) {
  const location = useLocation();
  const userInfo = useSelector((state) => state?.auth?.userInfo);
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item key="0">Profile</Menu.Item>
      <Menu.Item
        onClick={() => {
          dispatch(actions.signOutActions());
        }}
        key="1"
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

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
      <Dropdown overlay={menu} trigger={['click']}>
        <div
          onClick={(e) => e.preventDefault()}
          className="d-flex align-items-center"
        >
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
      </Dropdown>
    </Layout.Header>
  );
}

export default Header;
