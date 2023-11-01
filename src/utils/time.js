export default {
  getDateFromDateTime: (dateTime) => {
    let date = new Date(dateTime);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return (
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day)
    );
  },
  getTimeFromDateTime: (dateTime) => {
    let date = new Date(dateTime);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second)
    );
  },
  getDayFromDateTime: (dateTime) => {
    let date = new Date(dateTime);

    return date.getDay();;
  },

  
  getNowTime: () => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second)
    );
  },


};
