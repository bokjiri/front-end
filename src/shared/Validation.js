export const birthYear = (year) => {
  let _reg = /^(19[0-9][0-9]|20\d{2})$/;
  return _reg.test(year);
};

export const birthMonth = (month) => {
  let _reg = /^(0[1-9]|1[0-2])$/;
  return _reg.test(month);
};

export const birthDate = (date) => {
  let _reg = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;
  return _reg.test(date);
};
