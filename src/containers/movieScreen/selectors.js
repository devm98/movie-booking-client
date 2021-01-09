import { groupBy } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

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
    seatOriginals: seats,
    seats: groupBy(seats, 'row'),
  };
};

export const scheduleSelector = createSelector(
  (state) => state?.booking?.schedule?.data,
  (item) =>
    item.map((schedule) => moment(schedule.showingDate).utc().format('HH:mm'))
);

export const auditoriumSelector = createSelector(
  (state) => state?.booking?.room?.data,
  (item) =>
    item.map((schedule) => moment.utc(schedule.showingDate).format('HH:mm:ss'))
);

export const loadingRoomSelector = createSelector(
  (state) => state?.booking?.room?.loading,
  (loadingRoom) => loadingRoom
);

export const dataRoomSelector = createSelector(
  (state) => state?.booking?.room?.data,
  (dataRoom) => onGroupSeatsByRow(dataRoom)
);

export const seatsBookedSelector = createSelector(
  (state) => state?.booking?.seat?.data,
  (seatsBooked) => onGroupSeatsByRow(seatsBooked, true)
);

export const loadingSeatsBookedSelector = createSelector(
  (state) => state?.booking?.seat?.loading,
  (loading) => loading
);

export const loadingComingSoonMovieSelector = createSelector(
  (state) => state?.movie?.comingSoon.loading,
  (loading) => loading
);

export const loadingNowShowingMovieSelector = createSelector(
  (state) => state?.movie?.nowShowing.loading,
  (loading) => loading
);
