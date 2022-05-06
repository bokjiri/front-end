// 아이디 형식: 최소 6자 이상, 알파벳 소문자(a~z), 숫자(0~9)를 포함
export const birthYear = (year) => {
    let _reg = /^(19[0-9][0-9]|20\d{2})$/
    return _reg.test(year);
  };

  export const birthMonth = (userId) => {
    let _reg = /^(0[1-9]|1[0-2])$/;
    return _reg.test(userId);
  };

  export const birthDate = (userId) => {
    let _reg = /^(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return _reg.test(userId);
  };
