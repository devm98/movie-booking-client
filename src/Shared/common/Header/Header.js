import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../../actions/auth";
import "./style.css";

function Header() {
  const dispatch = useDispatch();

  // cách này không nên làm vì bảo mật
  const handleLogout = () => {
    dispatch(actions.signOutActions());
  };

  return (
    <>
      <div className="header-cinema">
        <div className="header-cinema_left">
          <a href="https://www.facebook.com/minhbdk">
            <FontAwesomeIcon
              style={{ color: "#339af0", fontSize: 20 }}
              icon={faFacebook}
            />
            Movies Updating Cinema
          </a>
          <span
            style={{
              fontWeight: 600,
              borderLeft: "2px solid",
              paddingLeft: 15,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faPhoneAlt}
              style={{
                color: "red",
                fontSize: 20,
                marginRight: 5,
                borderRadius: "50%",
                border: "1px solid",
                padding: 3,
              }}
            />
            Lien he: 0327808657
          </span>
        </div>
        <div>
          <Link to="/login"> Đăng nhập </Link>
          <Button type="link" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </div>
      <div className="logo-title">
        <h2>MOVIES</h2>
        <h2>CINEMA</h2>
      </div>
      <Divider style={{ background: "#cdc197", margin: 0, height: 5 }} />
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
