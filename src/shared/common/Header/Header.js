/* eslint-disable jsx-a11y/anchor-is-valid */
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import actions from '../../../state/actions/auth';
import './style.css';
import { isEmpty } from 'lodash';

const styleDivider = {
  background: '#cdc197',
  margin: 0,
  height: 5,
  borderTop: 'none',
};

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.signOutActions());
  };

  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return (
    <>
      <Divider style={styleDivider} />
      <div className="header-cinema">
        <div className="header-cinema_left">
          <a href="#">
            <FontAwesomeIcon style={{ color: '#339af0' }} icon={faFacebook} />
            Fanpage
          </a>
          <span
            style={{
              fontWeight: 600,
              paddingLeft: 15,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              icon={faPhoneAlt}
              style={{
                color: 'red',
                marginRight: 5,
                borderRadius: '50%',
                border: '1px solid',
                padding: 3,
              }}
            />
            0327808657
          </span>
        </div>
        <div className="header__info">
          {!isEmpty(userInfo) ? (
            <>
              <p>
                Xin chào {userInfo.gender === 'm' ? 'anh' : 'chị'}{' '}
                {userInfo.fullName}
              </p>
              <Button type="primary" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">Đăng nhập / Đăng ký</Link>
            </>
          )}
        </div>
      </div>
      <Divider style={styleDivider} />
      <div className="menu-bar">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to={`/booking`}>Đặt vé</Link>
          </li>
          <li>
            <Link to={`/info`}>Thông tin</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
