import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingActions from '../../../core/state/actions/booking';
import movieActions from '../../../core/state/actions/movies';
import {
  getLoadingMovieAllSelectors,
  getMovieAllSelectors,
  getMovieCreateHttpCodeSelector,
  getMovieCreateLoadingSelector,
  getMovieHttpCodeRemoveSelector,
  getMovieHttpCodeUpdateSelector,
  getMovieUpdateLoadingSelector,
  getPageInfoMovieAllSelectors,
} from '../selectors';
import CreateAndEditForm from './components/CreateAndEditForm';

const { getAllMovie, createMovie, updateMovie, removeMovie } = movieActions;

function MovieManagement(props) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    email: null,
    page: 1,
    limit: 10,
    query: undefined,
  });
  const [movieUpdated, setMovieUpdated] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [scheduleMovie, setScheduleMovie] = useState([]);

  const [visible, setVisible] = useState(false);
  // const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const { defaultCurrent, defaultPageSize } = props;

  const loadingCreated = useSelector(getMovieCreateLoadingSelector);
  const httpCodeCreated = useSelector(getMovieCreateHttpCodeSelector);
  const loadingUpdated = useSelector(getMovieUpdateLoadingSelector);
  const httpCodeUpdated = useSelector(getMovieHttpCodeUpdateSelector);
  const httpCodeDeleted = useSelector(getMovieHttpCodeRemoveSelector);

  // -======Movie=====-
  const allMovie = useSelector(getMovieAllSelectors);
  const loadingAllMovie = useSelector(getLoadingMovieAllSelectors);
  const pageInfoAllMovie = useSelector(getPageInfoMovieAllSelectors);

  const onCreateAndUpdate = (values) => {
    if (isUpdate) {
      dispatch(
        updateMovie({
          ...values,
          id: movieUpdated.id,
          description: values.description.content,
          showingSchedules: scheduleMovie,
        })
      );
    } else {
      dispatch(
        createMovie({
          ...values,
          description: values.description.content,
          showingSchedules: scheduleMovie,
        })
      );
    }
  };

  const handleCreateMovie = () => {
    setIsUpdate(false);
    setVisible(true);
    setScheduleMovie([]);
  };

  // const onFilter = (params) => {
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     ...params,
  //     page: 1,
  //   }));
  // };

  const onPaginateChange = ({ current, pageSize }) => {
    setFilters((prevState) => ({
      ...prevState,
      page: current,
      limit: pageSize,
    }));
  };

  const handleUpdateMovie = (records) => {
    setMovieUpdated(records);
    setIsUpdate(true);
    setVisible(true);
    dispatch(
      bookingActions.getMovieSchedule({
        type: '-1',
        movieId: records.id,
      })
    );
  };

  const handleDeleteMovie = (records) => {
    dispatch(removeMovie(records.id));
  };

  useEffect(() => {
    dispatch(getAllMovie(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (httpCodeCreated === 200 || httpCodeUpdated === 200) {
      setVisible(false);
      dispatch(getAllMovie(filters));
      setIsUpdate(false);
      notification['success']({
        message: `${isUpdate ? 'Cập nhật' : 'Tạo'} thành công`,
        description: `Bạn vừa ${isUpdate ? 'cập nhật' : 'tạo'} phim thành công`,
      });
    }
  }, [dispatch, filters, httpCodeCreated, httpCodeUpdated, isUpdate]);

  useEffect(() => {
    if (httpCodeDeleted === 200) {
      dispatch(getAllMovie(filters));
      notification['success']({
        message: 'Xoá thành công',
        description: 'Bạn vừa xoá phim thành công',
      });
    }
  });

  const columns = [
    {
      title: 'Tên phim',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Đạo diễn',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: 'Diễn viên',
      dataIndex: 'actors',
      key: 'actors',
    },
    {
      title: 'Thể loại',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Thể loại',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Ngày công chiếu',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Thời lượng (phút)',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      align: 'center',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 500,
    },
    // {
    //   title: 'Hình ảnh',
    //   dataIndex: 'image',
    //   key: 'image',
    // },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (records) => (
        <Space size="middle" align="center">
          <EditOutlined
            onClick={() => handleUpdateMovie(records)}
            style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#52c41a' }}
          />
          <DeleteOutlined
            onClick={() => {
              modal.confirm({
                title: 'Bạn có chắc muốn xoá phim ' + records.title,
                content: `Nếu xoá thì phim ${records.title} sẽ không còn tồn tại trên giao diện phim ở page cinema`,
                onOk: () => handleDeleteMovie(records),
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
        <h5>Danh sách phim</h5>
        {/* <Form
          form={form}
          name="basic"
          layout="inline"
          style={{ justifyContent: 'flex-end' }}
          onFinish={onFilter}
        >
          <Form.Item label="Thời điểm" name="query">
            <Select style={{ width: 200 }}>
              <Option value="now-showing">Đang chiếu</Option>
              <Option value="coming-soon">Sắp chiếu</Option>
            </Select>
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
                  getAllMovie({
                    page: defaultCurrent,
                    limit: defaultPageSize,
                  })
                );
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Form>*/}
      </div>
      <hr />
      <Button
        onClick={handleCreateMovie}
        type="primary"
        style={{
          float: 'right',
          marginBottom: 16,
        }}
      >
        Thêm mới
      </Button>
      <Table
        loading={loadingAllMovie}
        size="small"
        bordered
        columns={columns}
        dataSource={allMovie}
        scroll={{ x: 1500, y: 300 }}
        onChange={onPaginateChange}
        pagination={{
          current: filters.page,
          defaultCurrent,
          defaultPageSize,
          showSizeChanger: true,
          total: pageInfoAllMovie?.totalElements,
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
          movieUpdated={movieUpdated}
          loading={loadingCreated}
          loadingUpdated={loadingUpdated}
          onCreateAndUpdate={onCreateAndUpdate}
          scheduleMovie={scheduleMovie}
          setScheduleMovie={setScheduleMovie}
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

MovieManagement.defaultProps = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  dataSource: [],
};

export default MovieManagement;
