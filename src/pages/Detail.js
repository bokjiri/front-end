import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import post, { actionCreators as postActions } from "../redux/modules/post";

import { Text, Grid, Input, Button } from "../elements/index";

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const params = useParams();
  const dataId = params.dataId;
  console.log(params);
  const detail_post = useSelector((state) => state.post.detail_post);
  useEffect(() => {
    dispatch(postActions.getDetailFB(dataId));
  }, []);
  console.log(detail_post);

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
          <ModalGo
            onClick={() => dispatch(postActions.addBugFB(dataId, userId))}
          >
            맞지 않는 정책이 있다면 알려주세요!!
          </ModalGo>
          <InfoBox1>서비스명:{detail_post.name}</InfoBox1>
          <InfoBox1>생애주기 :{detail_post.lifeCycle} </InfoBox1>
          <InfoBox1>급여 서비스 내용 : {detail_post.summary}</InfoBox1>
          <InfoBox1>서비스 이용 및 신청 방법 : 이미지 추가</InfoBox1>

          {/* <Modal open={modalOpen} close={closeModal} /> */}
        </div>
        <div>
          <ShareIcon />
          <a style={{ cursor: "pointer" }} href={detail_post.link}>
            자세히 보기
          </a>
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
`;
