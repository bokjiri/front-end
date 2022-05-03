import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import { actionCreators as postActions } from "../redux/modules/post";

import { Text, Grid, Input, Button } from "../elements/index";

const Detail = (props) => {
  const dispatch = useDispatch();
  // const userCode = localStorage.getItem("userId")

  const dataId = useParams();
  console.log(dataId);
  const post_list = useSelector((state) => state.post.post.id);
  console.log(post_list);
  const history = useHistory();
  // const [modalOpen, setModalOpen] = useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };
  return (
    <ModalBack>
      <ModalBox>
        <div style={{ border: "1px solid red", width: "700px" }}>
          <button onClick={() => history.goBack()}>
            <CloseIcon />
          </button>
          <h1>정책 세부 내용</h1>
          {/* onClick={openModal} */}
          <ModalGo onClick={() => dispatch(postActions.addBugFB(dataId))}>
            맞지 않는 정책이 있다면 알려주세요!!
          </ModalGo>
          <InfoBox1></InfoBox1>
          <InfoBox1>생애주기 :</InfoBox1>
          <InfoBox1>급여 서비스 내용 :</InfoBox1>
          <InfoBox1>서비스 이용 및 신청 방법 : </InfoBox1>

          {/* <Modal open={modalOpen} close={closeModal} /> */}
        </div>
        <div>
          <ShareIcon />
          <button>자세히 보기</button>
        </div>
      </ModalBox>
    </ModalBack>
  );
};

export default Detail;

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 200px);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 750px;
  height: 700px;
  flex-direction: column;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalGo = styled.div`
  cursor: pointer;
  color: red;
  text-align: right;
`;

const InfoBox1 = styled.div`
  background-color: #eeeeee;
  margin-bottom: 30px;
  width: 300px;
  height: 100px;
`;
