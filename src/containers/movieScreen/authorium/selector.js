import { createSelector } from 'reselect';
import { groupBy } from 'lodash';

const onGroupSeatsByRow = (dataRoom, flag = false) => {
  if (flag) {
    return groupBy(dataRoom, 'row');
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
