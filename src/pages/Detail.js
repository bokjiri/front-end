import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Text, Grid, Input, Button } from "../elements/index";

import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { ReactIcon } from "../Icons/Icon";
import {
  actionCreators as postActions,
  detailsGet,
} from "../redux/modules/post";
import { addBugFB } from "../redux/modules/category";
import { ReactComponent as PostError } from "../Icons/PostError.svg";
import { ReactComponent as Bookmark_Disabled } from "../Icons/Bookmark_Disabled.svg";
import { ReactComponent as Bookmark_Active } from "../Icons/Bookmark_Active.svg";

import Cookies from "universal-cookie";
// import useSWR from "swr";
// import { apis } from "../shared/axios";
// import Loader from "../elements/Loader";
// import { DetailFetcher } from "../shared/Fetcher";

const cookies = new Cookies();

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const dataId = params.dataId;
  const detail_post = useSelector((state) => state.post.detail_post);
  const markState = detail_post.bookmarkState;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (cookies.get("userToken")) {
      dispatch(postActions.getDetailFB(dataId));
      return () => {
        dispatch(detailsGet());
      };
    } else {
      dispatch(postActions._getDetailDB(dataId));
    }
  }, [dispatch, dataId]);

  const BookClick = () => {
    if (cookies.get("userToken")) {
      dispatch(postActions.addBookFB(dataId));
    } else {
      Swal.fire({
        html: "로그인 후 이용해주세요. <br> 로그인 하러 가시겠습니까??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        }
      });
    }
  };
  const BugClick = () => {
    if (cookies.get("userToken")) {
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
          dispatch(addBugFB(dataId));
          Swal.fire({
            text: "맞지 않는 정책 신고가 완료되었습니다!",
          });
          history.replace("/main");
        }
      });
    } else {
      Swal.fire({
        html: "로그인 후 이용해주세요. <br> 로그인 하러 가시겠습니까??",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        }
      });
    }
  };

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

  // const { data, error } = useSWR(`/api/policies/${dataId}`, DetailFetcher);
  // console.log("detailswr", data);

  // if (error) {
  //   return <div>서비스 점검 중입니다.!!</div>;
  // }
  // if (!data) {
  //   return <Loader type="spin" color="#72A8FE" message={"Loading"} />;
  // }

  return (
    <Container>
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
              <ModalGo onClick={BugClick}>
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
                    <Bookmark_Active onClick={BookClick} />
                  ) : (
                    <Bookmark_Disabled onClick={BookClick} />
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
                      message="클립보드에 복사되었습니다"
                      key={vertical + horizontal}
                      onClick={url}
                    />
                  </ShareBtn>
                </CopyToClipboard>
              </div>
            </div>
            <Info>
              <Infotitle>지원대상</Infotitle>
              <InfoBox>
                <p>{detail_post.summary}</p>
              </InfoBox>
            </Info>
            <Info>
              <Infotitle>대상 지역 및 부서</Infotitle>
              <InfoBox>
                <p>
                  {detail_post.region === undefined ||
                  detail_post.region.length === 0
                    ? detail_post.institution
                    : detail_post.region}
                </p>
              </InfoBox>
            </Info>
            <Info>
              <Infotitle>서비스 내용</Infotitle>
              <InfoBox>
                <p>{detail_post.support}</p>
              </InfoBox>
            </Info>
          </div>
        </ModalDetail>
        <div>
          <SubmitBtn
            onClick={() => {
              window.open(detail_post.link);
            }}
          >
            더 알아보기
          </SubmitBtn>
        </div>
      </ModalBox>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e9f2ff;
  @media screen and (max-width: 720px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e9f2ff;
  }
`;

const PolicyDesire = styled.div`
  text-align: center;
  width: max-content;
  max-width: 100px;
  padding: 4px 8px;
  font-size: 12px;
  margin: 5px 0 20px 20px;
  background-color: #6dcdc7;
  border-radius: 5px;
  color: white;
  font-weight: 700;
`;

const ModalBox = styled.div`
  background: #f8faff;
  filter: drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.05));
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 846px;
  flex-direction: column;
  padding: 10px;
  margin: 170px 0 100px 0;
  @media screen and (max-width: 720px) {
    background: #f8faff;
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    width: 546px;
    flex-direction: column;
    padding: 10px;
    margin: 170px 0 100px 0;
  }
`;

const ModalDetail = styled.div`
  width: 900px;
  height: max-content;
`;

const CloseBtn = styled.div`
  margin: 30px 50px 0 0;
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
  margin: 9px 0 0 10px;
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

const Info = styled.div`
  margin-top: 40px;
`;

const Infotitle = styled.div`
  font-weight: 700;
  color: #0361fb;
  font-size: 18px;
  line-height: 26.06px;
  letter-spacing: 0.0015em;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  background-color: white;
  width: 770px;
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0.0015em;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  white-space: pre-wrap;
`;

const SubmitBtn = styled.div`
  width: 149px;
  height: 48px;
  cursor: pointer;
  margin: 45px 0;
  text-align: center;
  line-height: 48px;
  background: #0361fb;
  border-radius: 5px;
  color: #ffffff;
`;
