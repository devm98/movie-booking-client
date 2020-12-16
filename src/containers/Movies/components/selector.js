import { createSelector } from 'reselect';
import moment from 'moment';

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
