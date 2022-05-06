import React from "react";
import styled from "styled-components";
import smallLogo from "../imgs/Group 10.png";

import { Text, Grid, Input, Button } from "../elements/index";
import { ReactIcon } from "../Icons/Icon";

const Header = () => {
  return (
    <Contain>
      <img
        src={smallLogo}
        style={{ width: "170px", height: "44px", margin: "18px 0 18px 363px" }}
      />
      <Nav>
        <div>
          <ReactIcon.AiOutlineSearch />
          검색
        </div>
        <div>
          <ReactIcon.CgProfile />
          나의 정책
        </div>
        <div>
          <ReactIcon.MdLogout />
          로그아웃
        </div>
      </Nav>
    </Contain>
  );
};

export default Header;

const Contain = styled.div`
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  right: 0;
  height: 80px;
`;

const Nav = styled.div`
  display: flex;
  margin: 28px 363px 29px 0;
`;
