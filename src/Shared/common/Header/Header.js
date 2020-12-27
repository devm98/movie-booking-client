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

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.signOutActions());
  };

  const userInfo = useSelector((state) => state?.auth?.userInfo);

  return (
    <>
      <div className="header-cinema">
        <div className="header-cinema_left">
          <a href="https://www.facebook.com/minhbdk">
            <FontAwesomeIcon
              style={{ color: '#339af0', fontSize: 20 }}
              icon={faFacebook}
            />
            Movies Updating Cinema
          </a>
          <span
            style={{
              fontWeight: 600,
              borderLeft: '2px solid',
              paddingLeft: 15,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              icon={faPhoneAlt}
              style={{
                color: 'red',
                fontSize: 20,
                marginRight: 5,
                borderRadius: '50%',
                border: '1px solid',
                padding: 3,
              }}
            />
            Lien he: 0327808657
          </span>
        </div>
        <div>
          {!isEmpty(userInfo) ? (
            <p
              style={{
                display: 'inline-block',
                marginRight: 8,
                marginBottom: 0,
              }}
            >
              {userInfo.username}
            </p>
          ) : (
            <Link to="/login"> Đăng nhập </Link>
          )}

          <Button type="link" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
      <div className="logo-title">
        <h2>MOVIES</h2>
        <h2>CINEMA</h2>
      </div>
      <Divider style={{ background: '#cdc197', margin: 0, height: 5 }} />
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
