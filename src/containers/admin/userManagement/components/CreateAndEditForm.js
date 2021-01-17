import { DatePicker, Form, Input, Modal, Radio, Select } from 'antd';
import React from 'react';
import { ROLES } from '../../../../constants/roles';
import moment from 'moment';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CreateAndEditForm = ({
  visible,
  onCreateAndUpdate,
  onCancel,
  loading,
  loadingUpdated,
  isUpdate,
  userUpdated,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={isUpdate ? 'Cập nhật người dùng' : 'Tạo người dùng'}
      okText={isUpdate ? 'Cập nhật' : 'Tạo mới'}
      cancelText="Huỷ"
      style={{ top: 20 }}
      onCancel={onCancel}
      confirmLoading={loading || loadingUpdated}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreateAndUpdate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          initialValue={isUpdate ? userUpdated.fullName : ''}
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
          initialValue={isUpdate ? userUpdated.email : ''}
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

        {!isUpdate && (
          <>
            <Form.Item
              initialValue={isUpdate ? userUpdated.password : ''}
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
          </>
        )}

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
          initialValue={isUpdate ? userUpdated.phone : ''}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item
          initialValue={isUpdate ? userUpdated.address : ''}
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
          initialValue={isUpdate ? userUpdated.gender : ''}
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
        <Form.Item
          name="dateOfBirth"
          label="Ngày sinh"
          style={{ width: '100%' }}
          initialValue={
            userUpdated.dateOfBirth
              ? moment(userUpdated.dateOfBirth, 'DD-MM-YYYY')
              : ''
          }
        >
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Vai trò"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn vai trò cho người dùng!',
            },
          ]}
          initialValue={
            isUpdate ? userUpdated.roles.map((role) => role.name) : []
          }
        >
          <Select className="multi-select-custom" allowClear mode="multiple">
            {Object.keys(ROLES).map((role, i) => (
              <Option key={i} value={role}>
                {ROLES[role].value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAndEditForm;
