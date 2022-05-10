import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../components/Modal";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as bookActions } from "../redux/modules/bookMark";

import { ReactIcon } from "../Icons/Icon";
import { ReactComponent as PostError } from "../Icons/PostError.svg";
import { ReactComponent as Share } from "../Icons/ShareOff.svg";
import { ReactComponent as BookMarkOff } from "../Icons/BookMarkOff.svg";
import { ReactComponent as BookMarkOn } from "../Icons/BookMarkOn.svg";

import { Text, Grid, Input, Button } from "../elements/index";

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const params = useParams();
  const dataId = params.dataId;
  console.log(params);
  const detail_post = useSelector((state) => state.post.detail_post);
  console.log("디테일 나이 ", detail_post.age);

  useEffect(() => {
    dispatch(postActions.getDetailFB(dataId));
  }, []);
  console.log(detail_post);
  const [bookMark, setbookMark] = useState(false);

  const hello = () => {
    setbookMark(!bookMark);
    if (bookMark === true) {
      dispatch(bookActions.addBookFB(userId, dataId));
    } else {
      dispatch(bookActions.deleteBookFB(dataId));
    }
  };

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
        <ModalDetail>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CloseBtn onClick={() => history.goBack()}>
              <CloseIcon
                style={{ fontSize: "40px", float: "right", color: "#666666" }}
              />
            </CloseBtn>
            {/* onClick={openModal} */}

            <ModalGo
              onClick={() => dispatch(postActions.addBugFB(dataId, userId))}
            >
              <PostError />
            </ModalGo>
          </div>
          <div style={{ margin: "21px 0 0 45px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "59px",
              }}
            >
              <h1>{detail_post.name}</h1>
              <div style={{ display: "flex" }}>
                <BookBtn onClick={hello}>
                  {!bookMark === true ? <BookMarkOn /> : <BookMarkOff />}
                </BookBtn>

                <Share />
              </div>
            </div>
            <InfoBox>
              <InfoBox1>
                <span>
                  <b style={{ color: "#0361fb" }}>지원대상 </b>
                </span>
                <p>{detail_post.summary}</p>
              </InfoBox1>
              <InfoBox2>
                <span>
                  <b style={{ color: "#0361fb" }}>대상 지역 및 부서</b>
                </span>
                <p>
                  {detail_post.region
                    ? detail_post.region
                    : detail_post.institution}
                </p>
              </InfoBox2>
              <InfoBox3>
                <span>
                  <b style={{ color: "#0361fb" }}> 서비스 내용</b>
                </span>
                <p>{detail_post.support}</p>
              </InfoBox3>
            </InfoBox>
          </div>
          {/* <InfoBox1>서비스 이용 및 신청 방법 : 이미지 추가</InfoBox1> */}

          {/* <Modal open={modalOpen} close={closeModal} /> */}
        </ModalDetail>
        <div>
          {/* <ShareIcon /> */}
          <Button
            style={{ cursor: "pointer" }}
            _onClick={() => {
              window.open(detail_post.link);
            }}
          >
            신청하기
          </Button>
        </div>
      </ModalBox>
    </ModalBack>
  );
};

export default Detail;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.div`
  position: absolute;
  top: calc(25vh - 100px);
  left: calc(40vw - 200px);
  background-color: #f8faff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 750px;
  height: 800px;
  flex-direction: column;
`;

const ModalDetail = styled.div`
  width: 700px;
  height: 650px;
`;

const CloseBtn = styled.div``;

const ModalGo = styled.div`
  cursor: pointer;
  color: red;
  text-align: right;
  margin-right: 59px;
`;

const BookBtn = styled.div`
  border: 1px solid red;
`;

const InfoBox = styled.div`
  overflow: auto;
  margin: 10px 0 0 20px;
  height: 394px;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #217af4; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

const InfoBox1 = styled.div`
  background-color: white;
  margin-top: 30px;
  width: 601px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  span {
    margin: 20px 0 10px 20px;
  }
  p {
    margin: 0 0 0px 20px;
  }
`;

const InfoBox2 = styled.div`
  background-color: white;
  margin-top: 30px;
  height: 97px;
  width: 601px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  span {
    margin: 20px 0 10px 20px;
  }
  p {
    margin: 0 0 0px 20px;
  }
`;

const InfoBox3 = styled.div`
  background-color: white;
  margin-top: 30px;
  width: 601px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  span {
    margin: 20px 0 10px 20px;
  }
  p {
    margin: 0 0 0px 20px;
  }
`;
