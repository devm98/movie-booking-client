export function GetDates(daysToAdd) {
  let aryDates = [];
  let startDate = new Date();

  for (let i = 0; i <= daysToAdd; i++) {
    let currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    let newDate;

    if (1 <= currentDate.getDate() && currentDate.getDate() <= 9) {
      newDate = '0' + currentDate.getDate();
    }
    aryDates.push({
      dateVN:
        DayAsString(currentDate.getDay()) +
        ' ' +
        newDate +
        '/' +
        MonthAsString(currentDate.getMonth()) +
        '/' +
        currentDate.getFullYear(),
      dateKey:
        currentDate.getFullYear() +
        '-' +
        MonthAsString(currentDate.getMonth()) +
        '-' +
        newDate,
    });
  }

  return aryDates;
}

function MonthAsString(monthIndex) {
  // eslint-disable-next-line no-array-constructor
  var month = new Array();
  month[0] = '01';
  month[1] = '02';
  month[2] = '03';
  month[3] = '04';
  month[4] = '05';
  month[5] = '06';
  month[6] = '07';
  month[7] = '08';
  month[8] = '09';
  month[9] = '10';
  month[10] = '11';
  month[11] = '12';

  return month[monthIndex];
}

function DayAsString(dayIndex) {
  var weekdays = new Array(7);
  weekdays[0] = 'Chủ nhật';
  weekdays[1] = 'Thứ hai';
  weekdays[2] = 'Thứ ba';
  weekdays[3] = 'Thứ tư';
  weekdays[4] = 'Thứ năm';
  weekdays[5] = 'Thứ sáu';
  weekdays[6] = 'Thứ bảy';

  return weekdays[dayIndex];
}
