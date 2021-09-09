const moment = require('moment');

const isDate = (value) => {
  let isValid = false;
  const date = moment(value);

  if (value > 0 && date.isValid()) {
    isValid = true;
  }

  return isValid;
}

module.exports = {
  isDate
}