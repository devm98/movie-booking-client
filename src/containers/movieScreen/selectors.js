import { groupBy } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

export const scheduleSelector = createSelector(
  (state) => state?.schedule?.data,
  (item) =>
    item.map((schedule) => moment(schedule.showingDate).utc().format('HH:mm'))
);

export const auditoriumSelector = createSelector(
  (state) => state?.schedule?.dataRoom,
  (item) =>
    item.map((schedule) => moment.utc(schedule.showingDate).format('HH:mm:ss'))
);

export const loadingRoomSelector = createSelector(
  (state) => state?.schedule?.loadingRoom,
  (loadingRoom) => loadingRoom
);

const onGroupSeatsByRow = (dataRoom, flag = false) => {
  if (flag) {
    const newData = groupBy(dataRoom, 'id');
    for (const key in newData) {
      newData[key] = true;
    }
    return newData;
  }
  const { seats } = dataRoom;
  return {
    ...dataRoom,
    seats: groupBy(seats, 'row'),
  };
};

export const dataRoomSelector = createSelector(
  (state) => state.schedule.dataRoom,
  (dataRoom) => onGroupSeatsByRow(dataRoom)
);

export const seatsBookedSelector = createSelector(
  (state) => state.schedule.seatsBooked.data,
  (seatsBooked) => onGroupSeatsByRow(seatsBooked, true)
);

export const showingScheduleIdSelector = createSelector(
  (state) => state.schedule.dataRoom.showingScheduleId,
  (showingScheduleId) => showingScheduleId
);
