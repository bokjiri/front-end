import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { ReactIcon } from "../Icons/Icon";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as bookActions } from "../redux/modules/bookMark";
import { ReactComponent as PostError } from "../Icons/PostError.svg";
import { ReactComponent as Share_Disabled } from "../Icons/Share_Modal.svg";
import { ReactComponent as Share_Active } from "../Icons/Share_Active.svg";
import { ReactComponent as Bookmark_Disabled } from "../Icons/Bookmark_Disabled.svg";
import { ReactComponent as Bookmark_Active } from "../Icons/Bookmark_Active.svg";

import Swal from "sweetalert2";

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const dataId = params.dataId;
  const detail_post = useSelector((state) => state.post.detail_post);
  const mark_list = useSelector((state) => state.bookMark.marks_list);
  const markState = detail_post.bookmarkState;

  useEffect(() => {
    dispatch(postActions.getDetailFB(dataId));
  }, []);

  const url = window.location.href;

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <ModalBack>
      <ModalBox>
        <ModalDetail>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <CloseBtn onClick={() => history.goBack()}>
              <CloseIcon
                style={{
                  fontSize: "40px",
                  float: "right",
                  color: "#666666",
                  cursor: "pointer",
                }}
              />
            </CloseBtn>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "25px",
              }}
            >
              <PolicyDesire
                style={{
                  backgroundColor:
                    `${detail_post.desire}` === "일자리"
                      ? "#7FAAEE"
                      : null || `${detail_post.desire}` === "주거 및 일상생활"
                      ? "#EE5D58"
                      : null || `${detail_post.desire}` === "건강"
                      ? "#6DCDC7"
                      : null || `${detail_post.desire}` === "교육 및 돌봄"
                      ? "#FF98B7"
                      : null || `${detail_post.desire}` === "안전 및 권익보장"
                      ? "#FFA95A"
                      : null || `${detail_post.desire}` === "기타"
                      ? "#A397EF"
                      : null,
                }}
              >
                {detail_post.desire}
              </PolicyDesire>
              <ModalGo
                onClick={() =>
                  Swal.fire({
                    html: "맞지 않는 정책을 신고하시겠습니까? <br> 신고 시, 해당 맞춤 정책은 삭제됩니다.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(postActions.addBugFB(dataId));
                      Swal.fire({
                        text: "맞지 않는 정책 신고가 완료되었습니다!",
                      });
                      history.replace("/main");
                    }
                  })
                }
              >
                <PostError />
              </ModalGo>
            </div>
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
                <div style={{ cursor: "pointer" }}>
                  {markState === true ? (
                    <Bookmark_Active
                      onClick={() => {
                        dispatch(postActions.addBookFB(dataId));
                      }}
                    />
                  ) : (
                    <Bookmark_Disabled
                      onClick={() => {
                        dispatch(postActions.addBookFB(dataId));
                      }}
                    />
                  )}
                </div>
                <CopyToClipboard text={url}>
                  <ShareBtn>
                    <ReactIcon.BsShare
                      size="23px"
                      style={{
                        marginTop: "14px",
                      }}
                      onClick={handleClick({
                        vertical: "bottom",
                        horizontal: "center",
                      })}
                    ></ReactIcon.BsShare>
                    <Snackbar
                      anchorOrigin={{ vertical, horizontal }}
                      open={open}
                      onClose={handleClose}
                      message="클립보드에 복사되었습니다 </>"
                      key={vertical + horizontal}
                      onClick={url}
                    />
                  </ShareBtn>
                </CopyToClipboard>
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
        </ModalDetail>
        <div>
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

const PolicyDesire = styled.div`
  text-align: center;
  width: max-content;
  max-width: 100px;
  padding: 4px 8px;
  font-size: 12px;
  margin: 5px 0 10px 20px;
  background-color: #6dcdc7;
  border-radius: 5px;
  color: white;
  font-weight: 700;
`;

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
  width: 227px;
  height: 24px;
  margin: 0 70px 0 0;
`;

const ShareBtn = styled.div`
  text-align: center;
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 9px;
  cursor: pointer;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
`;

const PolicyName = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  width: 445px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
    background: #cccccc; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e8e8e8; /*스크롤바 뒷 배경 색상*/
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
