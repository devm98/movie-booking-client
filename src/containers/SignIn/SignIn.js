import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import actions from "../../actions/auth";

const { signInActions } = actions;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

function SignIn() {
  const dispatch = useDispatch();

  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const isLoggedIn = useSelector((state) => state?.auth?.idToken);

  const handleLogin = (data) => {
    dispatch(signInActions(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {redirectToReferrer ? (
        <Redirect to="/" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="header-cinema">
            <div className="header-cinema_left">
              <a href="https://www.facebook.com/minhbdk">
                <FontAwesomeIcon
                  style={{ color: "#339af0", fontSize: 20 }}
                  icon={faFacebook}
                />{" "}
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
          </div>
          <Link to="/" style={{ padding: "15px 0px" }} className="logo-title">
            <h2>MOVIES</h2>
            <h2>CINEMA</h2>
          </Link>
          <div style={{ padding: "20px 0", flex: "1 0 auto" }}>
            <Form {...layout} name="basic" onFinish={handleLogin}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
