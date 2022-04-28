import React from "react";
import styled from "styled-components";

import { Text, Grid, Input, Button } from "../elements/index";
import { ReactIcon } from "../Icons/Icon";

const Header = () => {
  return (
    <Contain>
      <div>복지리</div>
      <Nav>
        <div style={{ margin: "20px" }}>
          <ReactIcon.AiOutlineSearch />
          검색
        </div>
        <div style={{ margin: "20px" }}>
          <ReactIcon.CgProfile />
          나의 정책
        </div>
        <div style={{ margin: "20px" }}>
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
  width: 100%;
  height: 50px;
`;

const Nav = styled.div`
  display: flex;
`;
