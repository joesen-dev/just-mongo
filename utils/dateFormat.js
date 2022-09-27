// Import moment.js library
const moment = require("moment");

// get the current date from moment object
const getTimeStamp = (date) => {
  const now = moment();
  return now.format("ddd, MMM Do @ HH:mm");
  //   return now.format("YYYY-MM-DD HH:mm:ss");
};

module.exports = getTimeStamp;
