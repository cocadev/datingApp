import moment from 'moment';

export const timeFormatAndroid = timeStamp => {
  time = '';
  if (timeStamp) {
    if (moment().diff(timeStamp, 'days') == 0) {
      time = moment(timeStamp).format('H:mm');
    } else {
      time = moment(timeStamp).fromNow();
    }
  }
  // time = postTime.toUTCString();
  return time;
};
export const timeFormatIos = timeStamp => {
  time = '';
  if (timeStamp) {
    if (moment().diff(moment.unix(timeStamp.seconds), 'days') == 0) {
      time = moment.unix(timeStamp.seconds).format('H:mm');
    } else {
      time = moment.unix(timeStamp.seconds).fromNow();
    }
  }
  return time;
};

// export const timeFormat =
//   Platform.OS === 'ios' ? timeFormatIos : timeFormatAndroid;
export const timeFormat = timeFormatIos;
