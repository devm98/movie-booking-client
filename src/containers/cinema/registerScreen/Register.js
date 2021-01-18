import { Button, DatePicker, Form, Input, notification, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import authAction from '../../../core/state/actions/auth';
import moment from 'moment';
import { Redirect } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

function RegisterScreen() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const httpCode = useSelector((state) => state?.auth?.register.httpCode);
  const [redirected, setRedirected] = useState(false);

  const handleRegister = (values) => {
    dispatch(
      authAction.registerAction({
        ...values,
        dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
      })
    );
  };

  useEffect(() => {
    if (httpCode === 200) {
      notification['success']({
        message: 'Đăng ký thành công',
        description: 'Bây giờ bạn có thể đăng nhập để trải nghiệm',
      });
      setRedirected(true);
    }
  }, [httpCode]);

  return redirected ? (
    <Redirect to="/login" />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Container className="mt-5">
        <Card style={{ padding: '20px 0', flex: '1 0 auto' }}>
          <Card.Header>
            <div style={{ textAlign: 'center' }}>
              <h3>Đăng ký thành viên</h3>
            </div>
          </Card.Header>
          <Card.Body className="pt-5">
            <Form
              {...layout}
              form={form}
              name="register"
              scrollToFirstError
              onFinish={handleRegister}
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên!',
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject('Mật khẩu không khớp!');
                    },
                  }),
                ]}
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                  {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: 'Số điện thoại không đúng định dạng',
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!',
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                name="gender"
                className="collection-create-form_last-form-item"
                label="Giới tính"
              >
                <Radio.Group>
                  <Radio value="m">Nam</Radio>
                  <Radio value="f">Nữ</Radio>
                  <Radio value="d">Khác</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="dateOfBirth" label="Ngày sinh">
                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: '100%' }}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default RegisterScreen;
