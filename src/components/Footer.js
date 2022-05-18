import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo_Footer } from "../imgs/Logo_Footer.svg";

import { useSelector } from "react-redux";

import { ReactComponent as Mail } from "../Icons/Mail_Footer.svg";
import { ReactComponent as SNS } from "../Icons/Instagram_Footer.svg";
import { useLocation } from "react-router-dom";


const FooterTest = () => {
  const isLogin = useSelector((state) => state.user.isLogin);

  const location = useLocation();
  const path = location.pathname;

  return (
    path.includes("detail")
    ? null
    :
    isLogin && (
      <Container>
        <Wrap>
          <LogoBox>
            <Logo_Footer />
            <div>복지받고 세상 편하게 살자</div>
          </LogoBox>

          <SecondSection>
            <Contents>

              <div>복세편살은 복지로의 OPEN API를 사용합니다.</div>
              <div>문의 : boksei_@naver.com</div>
              <div>2022 복세편살 Co.All rights Reserved.</div>
            </Contents>

            <IconBox>
              <Mail />
              <SNS />

            </IconBox>
          </SecondSection>
        </Wrap>
      </Container>
    )
  );
};

export default FooterTest;

const Container = styled.footer`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 163px;
  background-color: var(--secondary-color);
  border-top : 1px solid #CCCCCC;
  & a {
    color: #3a95ff;
    font-weight: 700;
    font-size: var(--font-medium);
    margin-right: 24px;
    border: none;
    text-decoration: none;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  width: 1024px;
  margin-left: 56px;
`;
const Contents = styled.div`
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  div {
    font-size: 13px;
    font-weight: 500;
    color: #999999;
    text-align: left;
    margin-bottom: 5px;
    margin-top: 3px;
  }

  div:last-child {
    color: silver;
  }
`;

const SecondSection = styled.div`
  width: 750px;
  display: flex;
  justify-content: space-between;
`;

const IconBox = styled.div`
  display: flex;
  width: 80px;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;

  div {
    font-size: 13px;
    font-weight: 700;
    color: #999999;
    text-align: left;
    margin-bottom: 5px;
    margin-top : 7px;
  }
`
