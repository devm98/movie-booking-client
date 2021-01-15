import React from 'react';
import { Col as ColB, Row, Table } from 'react-bootstrap';
import moment from 'moment';
import { Tabs, Form, Radio } from 'antd';

export default (
  arrDay,
  form,
  schedules,
  handleSelectedSchedule,
  onChangeSchedule
) => [
  {
    title: 'Chi tiết phim',
    content: (movie) => (
      <Row>
        <ColB lg={3} xs={4}>
          <div>
            <img
              width="100%"
              src={`http://localhost:8080/images/${movie?.id}.jpg`}
              alt={'movie'}
            />
          </div>
        </ColB>
        <ColB lg={9} xs={8}>
          <Table striped hover>
            <tbody>
              <tr>
                <th width="25%">Thời lượng:</th>
                <td>{movie?.duration} phút</td>
              </tr>
              <tr>
                <th width="25%">Đạo diễn:</th>
                <td> {movie?.director}</td>
              </tr>
              <tr>
                <th width="25%">Diễn viên:</th>
                <td>{movie?.actors}</td>
              </tr>
              <tr>
                <th width="25%">Thể loại:</th>
                <td>{movie?.genre}</td>
              </tr>
              <tr>
                <th width="25%">Ngày ra mắt:</th>
                <td>{moment(movie?.releaseDate).format('DD/MM/YYYY')}</td>
              </tr>
              <tr>
                <th width="25%">Nội dung:</th>
                <td>
                  <div
                    className="detail__description"
                    dangerouslySetInnerHTML={{
                      __html: movie?.description,
                    }}
                  ></div>
                </td>
              </tr>
            </tbody>
          </Table>
        </ColB>
      </Row>
    ),
  },
  {
    title: 'Chọn ngày và khung giờ',
    content: (movie) => (
      <Tabs
        onChange={(activeKey, movieId) =>
          handleSelectedSchedule(activeKey, (movieId = movie.id))
        }
        defaultActiveKey="1"
      >
        {arrDay.map((day, i) => (
          <Tabs.TabPane tab={day.dateVN} key={day.dateKey}>
            <Form form={form} onValuesChange={onChangeSchedule}>
              {schedules.length > 0 ? (
                <Form.Item label="Các khung giờ hiện có:" name="timeSchedule">
                  <Radio.Group>
                    {schedules.map((item, i) => {
                      return (
                        <Radio.Button
                          style={{ marginRight: 10 }}
                          key={i}
                          value={item}
                        >
                          {item}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </Form.Item>
              ) : (
                'Ngày bạn chọn hiện chưa có lịch chiếu'
              )}
            </Form>
          </Tabs.TabPane>
        ))}
      </Tabs>
    ),
  },
];
