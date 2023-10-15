// const getAgePlugin = require('get-age');

const getAge = (birthdate) => {
  if (!birthdate) return new Error('birthdate is required');

  // return getAgePlugin(birthdate);
  const ageDifMs = Date.now() - new Date(birthdate);
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

module.exports = {
  getAge,
};
