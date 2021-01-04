import React from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import { Divider } from "antd";

function Footer() {
  return (
    <Container className="footer">
      <Divider />
      <div className="wrapper">
        <div className="logo">
          <img
            width="80%"
            src={require("../../../assets/images/logo.png")}
            alt="logo"
          />
        </div>
        <div className="detail-info">
          <table cellSpacing={0} border={0}>
            <colgroup width={134} />
            <colgroup width={1027} />
            <tbody>
              <tr>
                <td height={23} align="left" valign="top">
                  <b>
                    <font face="Segoe UI" size={3} color="#212529">
                      Giấy CNĐKDN:&nbsp;
                    </font>
                  </b>
                </td>
                <td align="left" valign="bottom">
                  <i>
                    <font face="Segoe UI" size={3} color="#212529">
                      0303675393, đăng ký lần đầu ngày 31/7/2008, đăng ký thay
                      đổi lần thứ 5 ngày 14/10/2015, cấp bởi Sở KHĐT thành phố
                      Hồ Chí Minh.
                    </font>
                  </i>
                </td>
              </tr>
              <tr>
                <td height={23} align="left" valign="bottom">
                  <b>
                    <font face="Segoe UI" size={3} color="#212529">
                      Địa Chỉ:
                    </font>
                  </b>
                </td>
                <td align="left" valign="bottom">
                  <i>
                    <font face="Segoe UI" size={3} color="#212529">
                      Tầng 2, Rivera Park Saigon - Số 7/28 Thành Thái, P.14,
                      Q.10, TPHCM.
                    </font>
                  </i>
                </td>
              </tr>
              <tr>
                <td height={23} align="left" valign="bottom">
                  <b>
                    <font face="Segoe UI" size={3} color="#212529">
                      Hotline:
                    </font>
                  </b>
                </td>
                <td align="left" valign="bottom">
                  <i>
                    <font face="Segoe UI" size={3} color="#212529">
                      1900 6017
                    </font>
                  </i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <strong>COPYRIGHT ©2020 Created by Water7 Team.</strong>
    </Container>
  );
}

export default Footer;
