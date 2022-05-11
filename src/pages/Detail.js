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
import { ReactComponent as Share_Disabled } from "../Icons/Share_Disabled.svg";
import { ReactComponent as Share_Active } from "../Icons/Share_Active.svg";
import { ReactComponent as Bookmark_Disabled } from "../Icons/Bookmark_Disabled.svg";
import { ReactComponent as Bookmark_Active } from "../Icons/Bookmark_Active.svg";

import { Text, Grid, Input, Button } from "../elements/index";

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const params = useParams();
  const dataId = params.dataId;
  console.log(params);
  const detail_post = useSelector((state) => state.post.detail_post);
  console.log("디테일 나이 ", detail_post.institution);
  const 지역 = detail_post.region;
  // const 부서 = () => {
  //   if(지역 === undefined){
  //     detail_post.institution
  //   } else if (지역.length !== 0){
  //     지역
  //   }

  // }
  console.log(지역);
  useEffect(() => {
    dispatch(postActions.getDetailFB(dataId));
  }, []);
  console.log(detail_post.resion);
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

            <ModalGo onClick={() => dispatch(postActions.addBugFB(dataId))}>
              <PostError />
            </ModalGo>
          </div>
          <div style={{ margin: "0px 0 0 45px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "59px",
              }}
            >
              <PolicyName>{detail_post.name}</PolicyName>
              <div style={{ display: "flex" }}>
                <BookBtn onClick={hello}>
                  {!bookMark === true ? (
                    <Bookmark_Active />
                  ) : (
                    <Bookmark_Disabled />
                  )}
                </BookBtn>

                <Share_Disabled />
              </div>
            </div>
            <InfoBox>
              <InfoBox1>
                <span>지원대상</span>
                <p>{detail_post.summary}</p>
              </InfoBox1>
              <InfoBox2>
                <span>대상 지역 및 부서</span>
                <p>
                  {detail_post.region === undefined ||
                  detail_post.region.length === 0
                    ? detail_post.institution
                    : detail_post.region}
                </p>
              </InfoBox2>
              <InfoBox3>
                <span>서비스 내용</span>
                <p>{detail_post.support}</p>
              </InfoBox3>
            </InfoBox>
          </div>
          {/* <InfoBox1>서비스 이용 및 신청 방법 : 이미지 추가</InfoBox1> */}

          {/* <Modal open={modalOpen} close={closeModal} /> */}
        </ModalDetail>
        <div>
          {/* <ShareIcon /> */}
          <SubmitBtn
            onClick={() => {
              window.open(detail_post.link);
            }}
          >
            신청하기
          </SubmitBtn>
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
  top: calc(21vh - 100px);
  left: calc(45vw - 200px);
  background-color: #f8faff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  width: 700px;
  height: 800px;
  flex-direction: column;
`;

const ModalDetail = styled.div`
  width: 700px;
  height: 800px;
  margin: 20px 10px 0 0;
`;

const CloseBtn = styled.div`
  margin-right: 10px;
`;

const ModalGo = styled.div`
  cursor: pointer;
  color: red;
  text-align: right;
  margin-right: 59px;
`;

const BookBtn = styled.div``;

const PolicyName = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  width: 445px;
`;

const InfoBox = styled.div`
  overflow: auto;
  height: 394px;
  margin-top: 40px;

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
  width: 581px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px;
  gap: 10px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;

  span {
    font-weight: 700;
    color: #0361fb;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
    margin-top: 10px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
  }
`;

const InfoBox2 = styled.div`
  background-color: white;
  margin-top: 30px;
  height: 97px;
  width: 581px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px;
  gap: 10px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  span {
    font-weight: 700;
    color: #0361fb;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
    margin-top: 10px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
  }
`;

const InfoBox3 = styled.div`
  background-color: white;
  margin-top: 30px;
  width: 581px;
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 20px;
  gap: 10px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  span {
    font-weight: 700;
    color: #0361fb;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
    margin-top: 10px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: 0.0015em;
  }
`;

const SubmitBtn = styled.div`
  width: 149px;
  height: 48px;
  cursor: pointer;
  margin-bottom: 60px;
  text-align: center;
  line-height: 48px;
  background: #0361fb;
  border-radius: 5px;
  color: #ffffff;
`;
