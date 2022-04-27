import React, { useState } from "react";
import { Input, Text, Grid, Button } from "../elements/index";
// import { getCookie, setCookie, deleteCookie } from '../shared/Cookie';
import { history } from "../redux/configureStore";
import styled from "styled-components";

import kakaoBtn from "../imgs/kakao_login.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState(false);

  const onChangeState = () => {
    setState(!state);
  };


  return (
    <React.Fragment>
      <Grid height="100vh" is_flex flexDirection="column" margin="0 auto">
        <Grid
          width="500px"
          bg="#72A8FE"
          height="400px"
          is_flex
          flexDirection="column"
        >
          <Text size="32px" bold>
            복지리
          </Text>
          <Text>서비스 이용을 위해 로그인이 필요합니다!</Text>
          <img
            src={kakaoBtn}
            alt="kakaoLogin"
            onClick={() => {
              if(state === false){
                alert("정보 약관 동의는 필수입니다!");
                return;
              }
              history.push("/main");
            }}
            style={{ width: "300px" }}
          />

          <LoginTerms>
            <input
              onChange={onChangeState}
              id="lawStatus"
              type="checkbox"
              className="check-int"
            />
            <label key="lawStatus" className="check-label"></label>
            <span className="check-box"></span>
            <Link to="/law">
              <span>디지털콘텐츠 이용</span>, <span>개인정보 이용 약관</span>
              <span>내용을 확인하였고 동의합니다.</span>
            </Link>
          </LoginTerms>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;

const LoginTerms = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  a {
    color: black;
    text-decoration: none;

    span {
      font-size: 13px;
    }
  }

  a:hover {
    color: red;
  }
`;

//체크박스
// input[type="checkbox"] {
//   display: none;
// }

// input[type="checkbox"] + label {
//   display: inline-block;
//   width: 10px;
//   height: 10px;
//   border: 1px solid #707070;
//   position: relative;
//   margin-right : 3px;
//   margin-top : 2px;
// }

// input[type="checkbox"]:checked + label::after {
//   content: "V";
//   font-size: 25px;
//   width: 30px;
//   height: 30px;
//   text-align: center;
//   position: absolute;
//   left: 0;
//   top: 0;
// }