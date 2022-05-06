import React from "react";

import styled from "styled-components";
import middleLogo from "../imgs/Group 11.png";

import { Text, Grid, Input, Button } from "../elements/index";
import { flexbox } from "@mui/system";

const Footer = () => {
  return (
    <FootBottom>
      <div style={{ display: "flex", marginTop: "45px" }}>
        <p>
          <img
            src={middleLogo}
            style={{
              width: "170px",
              height: "67px",
              marginLeft: "363px",
              marginRight: "30px",
            }}
          />
        </p>
        <p>
          <span>복세편살은 복지로의 오픈(OPEN) API정보를 사용합니다.</span>
          <br />
          <span>
            팀명 권지원(L & BE), 최서라(VL & FE), 이푸름(BE), 김영우(BE),
            한상원(FE), 김지원(DS), 백지윤(DS)
          </span>
          <br />

          <span>ⓒ 2022 Bokjiri Co. All rights Reserved.</span>
        </p>
      </div>
    </FootBottom>
  );
};

export default Footer;

const FootBottom = styled.footer`
  width: 100%;
  height: 158px;
  background-color: #ffffff;
  color: #828282;
  display: flex;
  margin-top: 136px;
`;
