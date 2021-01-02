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
        <ColB xl={3}>
          <div>
            <img
              width="100%"
              src={`http://localhost:8080/image/movie/${movie?.id}.jpg`}
              alt={'movie'}
            />
          </div>
        </ColB>
        <ColB xl={9}>
          <Table striped hover>
            <tbody>
              <tr>
                <th width="15%">Thời lượng:</th>
                <td>{movie?.duration} phút</td>
              </tr>
              <tr>
                <th width="15%">Đạo diễn:</th>
                <td> {movie?.director}</td>
              </tr>
              <tr>
                <th width="15%">Diễn viên:</th>
                <td>{movie?.actors}</td>
              </tr>
              <tr>
                <th width="15%">Thể loại:</th>
                <td>{movie?.genre}</td>
              </tr>
              <tr>
                <th width="15%">Ngày ra mắt:</th>
                <td>{moment(movie?.releaseDate).format('DD/MM/YYYY')}</td>
              </tr>
              <tr>
                <th width="15%">Nội dung:</th>
                <td>
                  <div
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
