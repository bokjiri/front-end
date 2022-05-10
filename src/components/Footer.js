import React from "react";
import styled from "styled-components";
import { Text } from "../elements";
// import logo from "../../assets/images/BACK-STOCK.svg";
// import corp from "../../assets/images/footer_corp.svg";
import { ReactComponent as Logo_Footer } from "../imgs/Logo_Footer.svg";

import { GrInstagram } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";

const FooterTest = () => {
  return (
    <Container>
      <Wrap>
      <Logo_Footer />

        <SecondSection>
        <Contents>
          {/* <Logo src={logo}></Logo> */}
          <div>복지받고 세상 편하게 살자</div>
          <div>복세편살은 복지로의 OPEN API를 사용합니다.</div>
          <div>문의 : seorachoi08@gmail.com</div>
          <div>2022 복세편살 Co.All rights Reserved.</div>
        </Contents>

        <IconBox>
        <GrInstagram size={20}/>
        <MdOutlineEmail size={23}/>
        </IconBox>

        </SecondSection>

      </Wrap>
    </Container>
  );
};

export default FooterTest;

const Container = styled.footer`
    display: flex;
    justify-content : center;
    width: 100vw;
    height: 100px;
    background-color: var(--secondary-color);
    & a {
        color : #3A95FF;
        font-weight: 700;
        font-size: var(--font-medium);
        margin-right: 24px;
        border: none;
        text-decoration: none;
    }
`

const Wrap = styled.div`
    display: flex;
    align-items: center;
    width: 1024px;
    margin-left: 56px;
    
`
const Contents = styled.div`
    margin-left : 30px;
    display: flex;
    flex-direction : column;
    justify-content : flex-start;

    div {
      font-size : 13px;
      font-weight : 500;
      color : #999999;
      text-align : left;
      margin-bottom : 5px;
    }

    div:last-child{
      color : silver;
    }
`

const SecondSection = styled.div`
    width : 750px;
    display : flex;
    justify-content : space-between;
`

const IconBox = styled.div`
    display : flex;
    width : 60px;
    justify-content : space-between;
    align-items : center;

`;