import React from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  Select,
  Spin,
  notification,
} from 'antd';
import {
  DollarOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import {
  getScheduleSelector,
  getLoadingScheduleSelector,
} from '../../selectors';

const { Option } = Select;

const AUDITORIUM = [
  { id: 1, name: 'Màn hình 1' },
  { id: 2, name: 'Màn hình 2' },
  { id: 3, name: 'Màn hình 3' },
  { id: 4, name: 'Màn hình 4' },
];

const ScheduleMovie = ({ scheduleMovie, setScheduleMovie }) => {
  const onFinish = (values) => {
    setScheduleMovie(values.showings);
    notification['success']({
      message: `Lưu thành công`,
    });
  };

  const schedules = useSelector(getScheduleSelector);
  const loading = useSelector(getLoadingScheduleSelector);

  return (
    <Spin spinning={loading}>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="showings" initialValue={schedules}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  {console.log(fields)}
                  <Form.Item
                    {...field}
                    name={[field.name, 'showingDate']}
                    fieldKey={[field.fieldKey, 'showingDate']}
                    label="Giờ chiếu"
                  >
                    <DatePicker format="DD/MM/YYYY HH:mm" showTime />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Màn hình"
                    name={[field.name, 'auditoriumId']}
                    fieldKey={[field.fieldKey, 'auditoriumId']}
                  >
                    <Select style={{ minWidth: 200 }}>
                      {AUDITORIUM.map((audi) => (
                        <Option key={audi.id} value={audi.id}>
                          {audi.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Giá"
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                  >
                    <Input
                      prefix={<DollarOutlined />}
                      autoComplete="off"
                      type="number"
                      suffix="VNĐ"
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm suất mới
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu lại
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ScheduleMovie;
