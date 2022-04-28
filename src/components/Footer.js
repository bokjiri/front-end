import React from "react";

import styled from "styled-components";
import { Text, Grid, Input, Button } from "../elements/index";

const Footer = () => {
  return (
    <FootBottom>
      <p>
        <span>복지리</span>
      </p>
      <p>
        <span>Made with..</span>
        <br />
        <span>
          권지원(L & BE), 최서라(VL & FE), 이푸름(BE), 김영우(BE), 한상원(FE),
          김지원(DS), 백지윤(DS)
        </span>
      </p>
      <p>
        <span>
          &lt;복지리 &gt;는 복지로사이트의 오픈(OPEN) API정보를 사용합니다.
        </span>
      </p>
    </FootBottom>
  );
};

export default Footer;

const FootBottom = styled.footer`
  width: 100%;
  height: 180px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
`;
