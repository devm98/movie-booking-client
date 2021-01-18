import React, { useEffect, useState } from 'react';
import LoginLogo from './images/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AdminLogin({ adminLoginHandler }) {
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
  });
  const [hasRedirect, setHasRedirect] = useState(false);
  const loginInfo = useSelector((state) => state?.auth);
  const { idToken, userInfo } = loginInfo;
  const roles = userInfo?.roles?.map((role) => role.name);

  useEffect(() => {
    if (idToken) {
      if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_MODERATOR'))
        setHasRedirect(true);
    }
  }, [idToken, roles]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLoginValue({
      ...loginValue,
      [name]: value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    adminLoginHandler(loginValue);
  };

  return hasRedirect ? (
    <Redirect to={'/admin'} />
  ) : (
    <div className="login-container">
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={LoginLogo} alt="IMG" />
            </div>
            <form
              className="login100-form validate-form"
              onSubmit={handleSubmitLogin}
            >
              <span className="login100-form-title">Member Login</span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  value={loginValue.email}
                  className="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  value={loginValue.password}
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
                <span className="focus-input100" />
                <span className="symbol-input100">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
              </div>
              <div className="text-center p-t-12"></div>
              <div className="text-center p-t-136"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
