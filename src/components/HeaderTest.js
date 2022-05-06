import React from "react";
import styled from "styled-components";

import { Text, Grid, Input, Button } from "../elements/index";
import { ReactIcon } from "../Icons/Icon";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { ReactComponent as Logo } from "../imgs/Logo_Header.svg";

import Cookies from "universal-cookie";
import { apis } from "../shared/axios";
import { BrowserRouter, Link } from "react-router-dom";
const cookies = new Cookies();

const HeaderTest = () => {
  const profileUrl = localStorage.getItem("profileUrl");

  const logOut = () => {
    cookies.remove("userToken", { path: "/" });
    cookies.remove("refreshToken", { path: "/" });
    localStorage.clear();

    history.replace("/");
    window.location.reload("/");
  };

  const userRemove = () => {
    const userId = localStorage.getItem("userId");
    apis
      .userDelete(userId)
      .then((res) => {
        cookies.remove("userToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        localStorage.clear();

        //history.replace("/");
        window.location.reload("/");
      })
      .catch((err) => {
        console.log("회원탈퇴 실패", err);
      });
  };

  // url path별로 location 지정
  // const location = useLocation();
  //   const path = location.pathname;
  //   // console.log(location)

  //   let href = path.includes('/detail') ? '/detail' 
  //   : path.includes('/folder') ? '/folder' 
  //   : path


  return (
    <>
      <Container>
        <div>
          {/* <BrowserRouter>
          <HomeLink to={"/"} title="메인으로">
          <img className="Logo" src={logo} />
          </HomeLink>
          </BrowserRouter> */}

          {/* push가 없는게 나을지? => 페이지 자체가 별로 없어서,,,*/}
          <Logo className="Logo" onClick={()=>{history.push("/main")}}/>  

          {
            cookies.get("userToken")
            ?
            <Box>
            <div className="auth none">
              <span>검색</span>
            </div>

            <div className="auth none" onClick={logOut}>
              <span>로그아웃</span>
            </div>

            <div className="auth none">
              <span>
                <div className="auth my">
                  <img className="profile" src={profileUrl} />
                  <div className="view">
                    <ul>
                      <li onClick={() => history.push("/addinfo")}>정보수정</li>
                      {/* <li onClick={() => history.push("/passedit")}>
                      비밀번호 재설정
                    </li>
                    <li onClick={() => history.push("/alarms")}>알람 내역</li>
                    <li onClick={() => history.push("/scrap")}>관심글</li> */}
                      <li className="userRemove" onClick={userRemove}>
                        회원탈퇴
                      </li>
                    </ul>
                  </div>
                </div>
              </span>
            </div>
            {/* <div className="auth none" onClick={userRemove}>
            <span>회원탈퇴</span>
          </div> */}
          </Box>
          : null

          }
          
        </div>
      </Container>
    </>
  );
};

export default HeaderTest;

const HomeLink = styled(Link)`
  display: flex;
`

const Box = styled.div`
  display: flex;
`;

// box-shadow: -4px 5px 14px 0 rgb(65 0 131 / 6%);
const Container = styled.div`
  min-width: 100vw;
  height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 24px;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgrey;
  display: flex;
  z-index: 10;
  position: fixed;

  > div {
    display: flex;
    align-items: center;
    width: 1200px;
    height: 40px;
    margin: 5px auto;
    justify-content: space-between;
  }

  .auth {
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    padding-left: 20px;
    padding-right: 17px;
    border-radius: 8px;
    cursor: pointer;

    font-weight: 700;
    font-size: 15px;
  }

  .profile {
    flex: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .Logo {
    flex: none;
    width: 170px;
    height: 44px;
    cursor: pointer;
  }

  div.my {
    display: flex;

    &:hover div.view ul {
      height: 110px;
    }

    i {
      margin-right: 10px;
    }

    i.active {
      span {
        position: relative;
      }
      span:before {
        --alert-size: 10px;
        content: "";
        position: absolute;
        bottom: 2px;
        right: -2px;
        width: var(--alert-size);
        height: var(--alert-size);
        border-radius: var(--alert-size);
        background-color: #de0000;
        box-shadow: 0 1px 3px 0 rgba(245, 80, 80, 0.25);
      }
    }
  }

  div.my > .arrow {
    margin-left: auto;
    width: 24px;
    height: 24px;
  }

  div.none {
    width: 70px;
    height: 52px;
    display: flex;
    color: #00092c;
    align-items: center;
    cursor: pointer;
    margin: 0 4px;
  }

  div.view {
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 10;
    height: 50px;

    ul {
      width: auto;
      height: 0;
      transition: height 0.2s ease-out;
      box-shadow: 0 0 10px 0 rgba(172, 168, 203, 0.4);
      overflow: hidden;
      background-color: #fff;
      border-radius: 8px;
      margin: 0;
      padding: 0;
    }
  }

  div.view li {
    display: flex;
    justify-content: center;
    align-items : center;
    list-style: none;
    height: 31px;
    margin-bottom: 6px;
    margin: 0;
    padding: 0;
    text-align: center;

    font-size: 14px !important;
    text-align: center;
    cursor: pointer;
    color: #333;
    font-size: 16px;
    border-radius: 2px;

    &:first-child {
      margin-top: 30px;
    }
    &:last-child {
      margin-bottom: 30px;
    }

    &.userRemove {
      color: red;
      &:hover {
        background-color: #998bff;
      }
    }

    &:hover {
      color: #fff;
      background-color: #7966ff;
    }
  }

  i {
    display: inline-flex;
    margin-right: 12px;
  }

  button {
    width: 138px;
    height: 52px;
    border-radius: 2rem;
    font-size: 14px;
    color: black;
  }
`;
