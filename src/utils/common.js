//获取当前时间戳
export function getCurrentTime() {
  return new Date().getTime();
}
//将时间戳转换为日期格式字符串
export function getDate(info) {
  var time = new Date(info);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  month = month >= 10 ? month : '0' + month;
  date = date >= 10 ? date : '0' + date;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
export const ORDER_STATUS_0 = 0; // 未支付

export const ORDER_STATUS_1 = 1; // 已支付

export const ORDER_STATUS_2 = 2; // 待收货

export const ORDER_STATUS_3 = 3; // 已完成

