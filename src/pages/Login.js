import React, { useState } from "react";
import { Input, Text, Grid, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import kakaoBtn from "../imgs/kakao_login.png";
import { Link } from "react-router-dom";

import { ReactComponent as LoginLogo } from "../imgs/Symbol.svg";
import { ReactComponent as LoginText } from "../imgs/Logo_Text.svg";

import CheckBox from "../Icons/CheckBox.png";
import CheckedBox from "../Icons/CheckedBox.png";

import Swal from "sweetalert2";

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
        <Grid is_flex width="100vw" height="100vh">
          <Container>
            <LoginLogo />

            <LoginBox>
              <Grid
                width="300px"
                height="90px"
                is_flex
                bg="none"
                margin="0 0 43px 0"
              >
              <LoginText />
              </Grid>
              <img
                src={kakaoBtn}
                alt="kakaoLogin"
                onClick={() => {
                  if (state === false) {
                    Swal.fire({
                      text : "이용 약관 동의는 필수입니다!",
                      confirmButtonColor: "#72A8FE",
                    });
                    return;
                  }
                  window.location.href = kakaoUrl;
                }}
                style={{ width: "300px", margin: "0 0 13px 0" }}
              />

              <LoginTerms>
                {state === true ? (
                  <>
                  <img src={CheckedBox} onClick={onChangeState}/>
                  <Link to="/law" style={{color : "#0361FB"}}>
                    <Text color="#0361FB" size="14px" width="266px" margin="0 0 0 10px">디지털콘텐츠 이용 및 개인정보 이용 약관 내용을 확인하였고 동의합니다.</Text>
                  </Link>
                  </>
                ) : (
                  <>
                  <img src={CheckBox} onClick={onChangeState}/>
                  <Link to="/law">
                    <Text color="#999999" size="14px" width="266px" margin="0 0 0 10px">디지털콘텐츠 이용 및 개인정보 이용 약관 내용을 확인하였고 동의합니다.</Text>
                  </Link>
                  </>
                )}
              </LoginTerms>
            </LoginBox>
          </Container>
        </Grid>
      </React.Fragment>
    );
  } else {
    history.replace("/addinfo");
  }

  return null;
};

export default Login;

const LoginTerms = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  a {
    color: #999999;
    text-decoration: none;
    cursor: pointer;

    p {
      color: ${(props) => props.color};
      text-decoration: none;
      cursor: pointer;
    }
  }

  a:focus {
    color : #0361FB!important;
  }
`;

const LoginBox = styled.div`
  width: 390px;
  height: 625px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left : 50px;

  img {
    cursor : pointer;
  }
`;

const Container = styled.div`
  margin-top: 150px;
  width: 990px;
  height: 625px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: white;
  box-shadow : 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  margin-bottom : 80px;
`;
