import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Modal from "../components/Modal";

import { Text, Grid, Input, Button } from "../elements/index";

const Detail = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Grid is_flex flexDirection="column" height="80vh" bg="green">
      <div style={{ cursor: "pointer", color: "red" }} onClick={openModal}>
        맞지 않는 정책이 있다면 알려주세요!!
      </div>
      <div>
        <h1>정책 세부 내용</h1>
        <InfoBox1>정책 이름</InfoBox1>
        <InfoBox1>세부 카테고리</InfoBox1>
        <InfoBox1>나이</InfoBox1>
        <InfoBox1>정보</InfoBox1>
        <Modal open={modalOpen} close={closeModal} />
      </div>
    </Grid>
  );
};

export default Detail;

const InfoBox1 = styled.div`
  background-color: #eeeeee;
  margin-bottom: 30px;
  width: 300px;
  height: 100px;
`;