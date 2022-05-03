import React, { useState } from "react";
import { Input, Text, Grid, Button } from "../elements/index";
// import { getCookie, setCookie, deleteCookie } from '../shared/Cookie';
import { history } from "../redux/configureStore";
import styled from "styled-components";

import kakaoBtn from "../imgs/kakao_login.png";
import { Link } from "react-router-dom";

import { instance } from "../shared/axios";
import { apis } from "../shared/axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {
  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const [state, setState] = useState(false);

  const onChangeState = () => {
    setState(!state);
  };


  if (!cookies.get("userToken")) {
    return (
      <React.Fragment>
        <Grid is_flex width="1920px">
          {/* 이미지? 왼쪽 섹션 */}
          <Grid width="480px" height="625px" bg="silver" margin="0">
            이미지?
          </Grid>

          <Grid height="100vh" width="480px" is_flex flexDirection="column" margin="0 30px">
            <LoginBox>
              <Grid width="300px" height="90px" is_flex bg="silver" margin="0 0 50px 0">
                복지리
              </Grid>
              {/* <Text>서비스 이용을 위해 로그인이 필요합니다!</Text> */}
              <img
                src={kakaoBtn}
                alt="kakaoLogin"
                onClick={() => {
                  if (state === false) {
                    alert("정보 약관 동의는 필수입니다!");
                    return;
                  }
                  window.location.href = kakaoUrl;
                }}
                style={{ width: "300px", margin : "0 0 40px 0"}}
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
                {state === true ? (
                  <Link to="/law" style={{ color: "#0361FB" }}>
                    <span>디지털콘텐츠 이용</span>
                    <span>개인정보 이용 약관</span>
                    <span>내용을 확인하였고 동의합니다.</span>
                  </Link>
                ) : (
                  <Link to="/law">
                    <span>디지털콘텐츠 이용</span>
                    <span>개인정보 이용 약관</span>
                    <span>내용을 확인하였고 동의합니다.</span>
                  </Link>
                )}
              </LoginTerms>
            </LoginBox>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
      history.replace("/addinfo") 
      
    }
    
    

  return null;
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
`;

const LoginBox = styled.div`
  width : 480px;
  height : 625px;
  display : flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
  background-color : white;
  box-shadow: 0px 0px 20px 5px #f7f5f2;
  border-radius : 7px;
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
