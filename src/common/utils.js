/* eslint-disable prefer-template */
/* eslint-disable operator-assignment */
import {colors} from './colors';
import {p} from './normalize';

class UtilService {
  static acceptColor(item) {
    let color = colors.BLACK;

    if (item && item.image && item.image.length > 1) {
      color = colors.RED;
    }
    if (item && item.website && item.website.title) {
      color = colors.GREY8;
    }
    if (item && item.notice) {
      color = colors.GREEN;
    }
    if (item && item.image && item.image.length === 1) {
      color = colors.BLACK;
    }
    if (item && item.text) {
      color = item.text.color;
    }

    return color;
  }

  static acceptFontSize(hello) {
    const myLength = hello.length;
    let result = p(45);
    if (myLength > 1) {
      result = p(45);
    }
    if (myLength > 3) {
      result = p(36);
    }
    if (myLength > 7) {
      result = p(30);
    }
    if (myLength > 10) {
      result = p(20);
    }
    if (myLength > 13) {
      result = p(16);
    }
    if (myLength > 20) {
      result = p(12);
    }

    return result;
  }

  static getHourMinutes(myDate) {
    const date = myDate - new Date().getTimezoneOffset() * 600000;

    const dd = new Date(date);

    let h = dd.getHours();
    const m = dd.getMinutes();
    let AP = ' AM';
    if (h > 12) {
      h = h - 12;
      AP = ' PM';
    }
    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    // const year = dd.getFullYear();

    return (
      // padWithZero(dd.getMonth() + 1) +
      // '/' +
      // padWithZero(dd.getDate()) +
      // '/' +
      // year.toString() +
      // ' ' +
      padWithZero(h) + ':' + padWithZero(m) + AP
    );
  }
}

export default UtilService;
