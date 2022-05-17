import React, { useEffect } from "react";
import styled from "styled-components";

import { BiSearchAlt } from "react-icons/bi";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { ReactComponent as Logo } from "../imgs/Logo_Header.svg";

import Cookies from "universal-cookie";

import Swal from "sweetalert2";

import { useLocation } from "react-router-dom";

const cookies = new Cookies();

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const profileUrl = localStorage.getItem("profileUrl");

  const logOut = () => {
    dispatch(userActions.logoutDB());
  };

  const userRemove = () => {
    const userId = localStorage.getItem("userId");

    Swal.fire({
      text: "회원 탈퇴를 진행하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userActions.SignOutDB(userId));

        Swal.fire(
          "회원 탈퇴가 완료되었습니다!",
          "회원 정보가 모두 삭제되었습니다!"
        );
      }
    });
  };


  return (
    <>
      <Container>
        <div>
          {path === "/addinfo" ? (
            <Logo className="Logo" />
          ) : isLogin && cookies.get("userToken") ? (
            <>
            <Logo
            className="Logo"
            onClick={() => {
              history.push("/main");
            }}
          />
            <Box>
              <div className="auth none">
                <BiSearchAlt
                  size="30"
                  onClick={() => {
                    history.push("/search");
                  }}
                />
              </div>

              <div className="auth none">
                <span>
                  <div className="auth my">
                    <img className="profile" src={profileUrl} />
                    <div className="view">
                      <ul>
                        <li onClick={() => history.push("/modifyinfo")}>
                          정보수정
                        </li>
                        <li className="userRemove" onClick={userRemove}>
                          회원탈퇴
                        </li>
                        <li className="userRemove" onClick={logOut}>
                          로그아웃
                        </li>
                      </ul>
                    </div>
                  </div>
                </span>
              </div>
            </Box>
            </>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default Header;

const Box = styled.div`
  display: flex;
  justfiy-content: center;
  align-items: center;
`;

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
    padding-left: 10px;
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
      height: 150px;
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
    height: 100px;

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
    align-items: center;
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
      &:hover {
        color: red;
      }
    }

    &:hover {
      color: #72a8fe;
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
