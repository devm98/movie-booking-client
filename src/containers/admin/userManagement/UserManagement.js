import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Space,
  Table,
  Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../../constants/roles';
import { getLoadingSelector, getUserSelectors } from '../selectors';
import CreateAndEditForm from './components/CreateAndEditForm';
import moment from 'moment';
import {
  getCreateLoadingSelector,
  getHttpCodeSelector,
  getPagingSelectors,
  getHttpCodeUpdateSelector,
  getUpdateLoadingSelector,
  getHttpCodeRemoveSelector,
} from '../selectors';
import userActions from '../../../core/state/actions/user';

const { createUser, getUsers, updateUser, removeUser } = userActions;
function UserManagement(props) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    email: null,
    page: 1,
    limit: 10,
  });
  const [userUpdated, setUserUpdated] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const { defaultCurrent, defaultPageSize } = props;

  const roles = useSelector((state) => state?.auth?.userInfo?.roles);
  const rolesMap = roles.map((item) => item.name);
  const data = useSelector(getUserSelectors);
  const pagingInfo = useSelector(getPagingSelectors);
  const loading = useSelector(getLoadingSelector);
  const loadingCreated = useSelector(getCreateLoadingSelector);
  const httpCodeCreated = useSelector(getHttpCodeSelector);
  const loadingUpdated = useSelector(getUpdateLoadingSelector);
  const httpCodeUpdated = useSelector(getHttpCodeUpdateSelector);
  const httpCodeDeleted = useSelector(getHttpCodeRemoveSelector);

  const onCreateAndUpdate = (values) => {
    if (isUpdate) {
      dispatch(
        updateUser({
          ...values,
          id: userUpdated.id,
          dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
        })
      );
    } else {
      dispatch(
        createUser({
          ...values,
          password: values.confirm,
          dateOfBirth: moment(values.dateOfBirth).format('YYYY-MM-DD'),
        })
      );
    }
  };

  const handleCreateUser = () => {
    setIsUpdate(false);
    setVisible(true);
  };

  const onFilter = (params) => {
    setFilters((prevState) => ({
      ...prevState,
      ...params,
      page: 1,
    }));
  };

  const onPaginateChange = ({ current, pageSize }) => {
    setFilters((prevState) => ({
      ...prevState,
      page: current,
      limit: pageSize,
    }));
  };

  const handleUpdateUser = (records) => {
    setUserUpdated(records);
    setIsUpdate(true);
    setVisible(true);
  };

  const handleRemoveUser = (records) => {
    dispatch(removeUser(records.id));
  };

  useEffect(() => {
    dispatch(getUsers(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (httpCodeCreated === 200 || httpCodeUpdated === 200) {
      setVisible(false);
      dispatch(getUsers(filters));
      setIsUpdate(false);
      notification['success']({
        message: `${isUpdate ? 'Cập nhật' : 'Tạo'} thành công`,
        description: `Bạn vừa ${
          isUpdate ? 'cập nhật' : 'tạo'
        } người dùng thành công`,
      });
    }
  }, [dispatch, filters, httpCodeCreated, httpCodeUpdated, isUpdate]);

  useEffect(() => {
    if (httpCodeDeleted === 200) {
      dispatch(getUsers(filters));
      notification['success']({
        message: 'Xoá thành công',
        description: 'Bạn vừa xoá người dùng khỏi hệ thống thành công',
      });
    }
  });

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
      width: 100,
      fixed: 'right',
      render: (records) => (
        <Space size="middle" align="center">
          <EditOutlined
            onClick={() =>
              rolesMap?.includes('ROLE_ADMIN') && handleUpdateUser(records)
            }
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#52c41a' }}
          />
          <DeleteOutlined
            onClick={() => {
              rolesMap?.includes('ROLE_ADMIN') &&
                modal.confirm({
                  title: 'Bạn có chắc muốn xoá ' + records.fullName,
                  content: `Nếu xoá thì người dùng ${records.fullName}, đồng nghĩa với việc người dùng này sẽ mất hết quyền truy cập vào hệ thống`,
                  onOk: () =>
                    rolesMap?.includes('ROLE_ADMIN') &&
                    handleRemoveUser(records),
                  okText: 'Đồng ý',
                  cancelText: 'Huỷ',
                });
            }}
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: 'red' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h5>Danh sách người dùng</h5>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          layout="inline"
          style={{ justifyContent: 'flex-end' }}
          onFinish={onFilter}
        >
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields();
                dispatch(
                  getUsers({
                    page: defaultCurrent,
                    limit: defaultPageSize,
                  })
                );
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr />
      <Button
        onClick={handleCreateUser}
        type="primary"
        style={{
          float: 'right',
          marginBottom: 16,
        }}
        disabled={!rolesMap?.includes('ROLE_ADMIN')}
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
        onChange={onPaginateChange}
        pagination={{
          current: filters.page,
          defaultCurrent,
          defaultPageSize,
          showSizeChanger: true,
          total: pagingInfo?.totalElements,
          size: 'small',
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      {/* ================ Modal Edit and Create ================= */}
      {visible && (
        <CreateAndEditForm
          visible
          isUpdate={isUpdate}
          userUpdated={userUpdated}
          loading={loadingCreated}
          loadingUpdated={loadingUpdated}
          onCreateAndUpdate={onCreateAndUpdate}
          onCancel={() => {
            setVisible(false);
            setIsUpdate(false);
          }}
        />
      )}
      {contextHolder}
    </div>
  );
}

UserManagement.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  dataSource: [],
};

export default UserManagement;
