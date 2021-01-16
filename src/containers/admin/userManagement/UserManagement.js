import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ROLES } from '../../../constants/roles';
import { getLoadingSelector, getUserSelectors } from '../selectors';
import useEnhance from '../useEnhance';
import CreateAndEditForm from './components/CreateAndEditForm';
import moment from 'moment';
import { getCreateLoadingSelector, getHttpCodeSelector } from '../selectors';

function UserManagement() {
  const { onDispatchGetUsers, onCreateUser } = useEnhance();
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    onCreateUser({
      ...values,
      password: values.confirm,
      dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
    });
  };

  const data = useSelector(getUserSelectors);
  const loading = useSelector(getLoadingSelector);
  const loadingCreated = useSelector(getCreateLoadingSelector);
  const httpCodeCreated = useSelector(getHttpCodeSelector);

  const handleCreateUser = () => {
    setVisible(true);
  };

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      width: 120,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      width: 80,
      key: 'gender',
      render: (record) => (
        <p>{record === 'm' ? 'Nam' : record === 'f' ? 'Nữ' : 'GT khác'}</p>
      ),
    },
    {
      title: 'Quyền',
      key: 'roles',
      render: (record) => {
        return record.roles.map((role, i) => (
          <Tag key={i} color={ROLES[role.name].color}>
            {ROLES[role.name].value}
          </Tag>
        ));
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 80,
      render: () => (
        <Space size="middle" align="center">
          <EditOutlined
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#52c41a' }}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'red' }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    onDispatchGetUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (httpCodeCreated === 200) {
      setVisible(false);
      onDispatchGetUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [httpCodeCreated]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h5>Danh sách người dùng</h5>
        <Form name="basic" initialValues={{ remember: true }} layout="inline">
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr />
      <Button
        loading={loadingCreated}
        onClick={handleCreateUser}
        type="primary"
        style={{
          float: 'right',
          marginBottom: 16,
        }}
      >
        Tạo người dùng
      </Button>
      <Table
        loading={loading}
        size="small"
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: 1200, y: 300 }}
      />
      {/* ================ Modal Edit and Create ================= */}
      <CreateAndEditForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}

export default UserManagement;
