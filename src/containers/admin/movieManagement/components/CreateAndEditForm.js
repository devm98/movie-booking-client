import { ClockCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Modal, Tabs, Upload } from 'antd';
import React from 'react';
import Editor from './Editor';
import moment from 'moment';
import ScheduleMovie from './ScheduleMovie';
import { Button } from 'antd/lib/radio';

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
  movieUpdated,
  scheduleMovie,
  setScheduleMovie,
}) => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  return (
    <Modal
      visible={visible}
      title={isUpdate ? 'Cập nhật phim' : 'Tạo phim'}
      okText={isUpdate ? 'Cập nhật' : 'Tạo mới'}
      cancelText="Huỷ"
      style={{ top: 20 }}
      onCancel={onCancel}
      confirmLoading={loading || loadingUpdated}
      width={1000}
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
      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane tab="Chi tiết" key="1">
          <Form
            {...formItemLayout}
            style={{ width: '85%' }}
            form={form}
            name="register"
            scrollToFirstError
          >
            <Form.Item
              name="title"
              label="Tên phim"
              initialValue={isUpdate ? movieUpdated.title : ''}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cho phim!',
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              initialValue={isUpdate ? movieUpdated.director : ''}
              name="director"
              label="Đạo diễn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đạo diễn của phim!',
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>

            <Form.Item
              initialValue={isUpdate ? movieUpdated.actors : ''}
              name="actors"
              label="Diễn viên"
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              initialValue={isUpdate ? movieUpdated.genre : ''}
              name="genre"
              label="Thể loại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thể loại phim!',
                },
              ]}
            >
              <Input autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Ngày công chiếu"
              style={{ width: '100%' }}
              initialValue={
                movieUpdated.releaseDate
                  ? moment(movieUpdated.releaseDate, 'DD-MM-YYYY')
                  : ''
              }
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item
              initialValue={isUpdate ? movieUpdated.duration : ''}
              name="duration"
              label="Thời lượng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thời lượng phim!',
                },
              ]}
            >
              <Input
                prefix={<ClockCircleOutlined />}
                autoComplete="off"
                type="number"
                suffix="Phút"
              />
            </Form.Item>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <Editor valueUpdate={isUpdate ? movieUpdated.description : ''} />
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lập lịch chiếu" key="2">
          <ScheduleMovie
            scheduleMovie={scheduleMovie}
            setScheduleMovie={setScheduleMovie}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateAndEditForm;
