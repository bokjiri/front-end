import React from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { Text, Grid, Input, Button } from "../elements/index";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Mypage = () => {
  return (
    <>
      <Header />
      <Grid is_flex height="50vh" flexDirection="column">
        <div>내 정보</div>
        <div
          style={{
            border: "1px solid ",
            width: "700px",
            height: "300px",
            position: "relative",
          }}
        >
          <button style={{ position: "absolute", bottom: "0", right: "0" }}>
            수정하기
          </button>
        </div>
        <div>
          <div>나의 정책</div>
        </div>
        <div style={{ display: "flex" }}></div>
        <Footer />
      </Grid>
    </>
  );
};

export default Mypage;
