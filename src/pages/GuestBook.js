import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GuestBookCard from "../components/GuestBookCard";

import styled from "styled-components";
import Swal from "sweetalert2";
import useSWR, { useSWRConfig } from "swr";
import { apis } from "../shared/axios";
import Loader from "../elements/Loader";
import { FeedFetcher } from "../shared/Fetcher";

import { Text, Grid, Input, Button } from "../elements/index";
import { addContentDB, getContentDB } from "../redux/modules/guestBook";
import { ReactComponent as Top } from "../Icons/Top.svg";

const GuestBook = () => {
  const dispatch = useDispatch();

  const _today = new Date();
  const _year = _today.getFullYear();
  const _month = ("0" + (_today.getMonth() + 1)).slice(-2);
  const _date = _today.getDate();
  const upScroll = (e) => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const profileUrl = localStorage.getItem("profileUrl");
  const nickName = localStorage.getItem("nickName");
  const Feed_list = useSelector((state) => state.guestBook.content);

  const [content, setContent] = useState("");
  const [textLength, setTextLength] = useState(0);

  const addFeed = () => {
    if (content === "") {
      Swal.fire("내용을 작성해 주세요.");
      return;
    }
    dispatch(addContentDB(content));
    setContent("");
    setTextLength(0);
  };

  const checkLength = (e) => {
    let inputLength = e.target.value.length;

    if (inputLength >= 500) {
      Swal.fire("500자까지 작성해주세요.");
      return;
    }
    setTextLength(inputLength);
  };

  useEffect(() => {
    dispatch(getContentDB());
  }, []);

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/guestbooks/`, FeedFetcher);
  console.log("swr", data, error);

  if (error) {
    return <div>서비스 점검 중입니다.!!</div>;
  }
  if (!data) {
    return <Loader type="spin" color="#72A8FE" message={"Loading"} />;
  }

  return (
    <>
      <ContentWarp>
        <Container>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <TitleText>복세편살에게 한마디</TitleText>
          </div>
          <ContentWrite>
            <ContentTitle>
              <ContentProfile src={profileUrl} />
              <ContentName>{nickName} </ContentName>
              <ContentCreateAt>
                {_year + "-" + _month + "-" + _date}
              </ContentCreateAt>
            </ContentTitle>
            <ContentDesc>
              <ContentInput
                value={content}
                maxLength="500"
                placeholder="내용을 입력해주세요"
                onChange={(e) => {
                  setContent(e.target.value);
                  checkLength(e);
                }}
              ></ContentInput>
              <text
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 30px 0 0",
                }}
              >
                <text style={{ color: "#0361FB" }}>{textLength}</text> / 500
              </text>
            </ContentDesc>
          </ContentWrite>
          <ClickBtn>
            <Button width="156px" height="48px" radius="5px" _onClick={addFeed}>
              등록하기
            </Button>
          </ClickBtn>
          <Top
            style={{
              position: "fixed",
              bottom: "20%",
              right: "13%",
              cursor: "pointer",
            }}
            onClick={upScroll}
          />
        </Container>

        <div>
          <GuestBookCard Feed_list={Feed_list} />
        </div>
      </ContentWarp>
    </>
  );
};

export default GuestBook;

const ContentWarp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

const Container = styled.div`
  width: 100vw;
  height: 540px;
  background-color: #e9f2ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 80px 0;
`;

const TitleText = styled.h1`
  font-size: 34px;
  margin-right: 900px;
`;

const ContentWrite = styled.div`
  width: 1144px;
  height: 233px;
  background-color: white;
  padding: 30px 30px 49px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  gap: 20px;
  margin-bottom: 20px;
`;

const ContentTitle = styled.div`
  display: flex;
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
`;

const ContentProfile = styled.img`
  flex: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const ContentName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin: 0 10px;
`;
const ContentCreateAt = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #999999;
`;

const ContentDesc = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
`;

const ClickBtn = styled.div`
  margin-left: 1050px;
  button {
    &:hover {
      background-color: #0361fb;
      color: white;
    }
  }
`;

const ContentInput = styled.textarea`
  width: 1101px;
  height: 103px;
  border-radius: 10px;
  color: #666666;
  font-weight: 400;
  font-size: 16px;
  padding: 15px;
  background-color: #ffffff;
  border-color: #999999;
  outline-color: #666666;
  resize: none;

  ::placeholder {
    color: #999999;
  }
`;
