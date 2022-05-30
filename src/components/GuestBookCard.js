import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FeedBtn from "./FeedBtn";

import useSWR from "swr";
import { apis } from "../shared/axios";
import Loader from "../elements/Loader";
import { FeedFetcher } from "../shared/Fetcher";

import { reportContentDB } from "../redux/modules/guestBook";

const GuestBookCard = (props) => {
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickName");
  const [_content, _setContent] = useState("");
  const content = _content;

  const Feed_Card = props.Feed_list;

  const [textLength, setTextLength] = useState(0);
  const checkLength = (e) => {
    let inputLength = e.target.value.length;

    if (inputLength >= 500) {
      window.alert("500자까지 작성해주세요.");
      return;
    }
    setTextLength(inputLength);
  };

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
      {Feed_Card &&
        Feed_Card.map((x, index) =>
          nickname === x.nickname ? (
            <Card key={index}>
              <FeedBtn {...x} />
            </Card>
          ) : (
            <Card>
              <ContentTitle>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <CardProfile src={x.profileUrl} />
                  <CardName>{x.nickname}</CardName>
                  <ContentCreateAt>{x.date}</ContentCreateAt>
                  <Report
                    onClick={
                      () => dispatch(reportContentDB(x.feedId))
                      // window.alert("게시글이 신고 되었습니다.")
                    }
                  >
                    ❘ 신고
                  </Report>
                </div>
              </ContentTitle>
              <CardDesc>{x.content}</CardDesc>
            </Card>
          )
        )}
    </>
  );
};

export default GuestBookCard;

const Card = styled.div`
  width: 1134px;
  height: max-content;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
  border-radius: 14px;
  margin-bottom: 40px;
`;

const ContentTitle = styled.div`
  display: flex;
  width: 1130px;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CardProfile = styled.img`
  flex: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const CardName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  margin: 0 10px;
`;

const ContentCreateAt = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #999999;
  margin-right: 10px;
`;

const EditBtn = styled.div`
  width: 39px;
  height: 25px;
  background: #e8e8e8;
  border-radius: 4px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 700;
  color: #999999;
  cursor: pointer;
  &:hover {
    background-color: #0361fb;
    color: white;
  }
`;

const DeleteBtn = styled.div`
  width: 39px;
  height: 25px;
  margin: 0 20px;
  background: #e8e8e8;
  border-radius: 4px;
  line-height: 25px;
  font-size: 12px;
  font-weight: 700;
  color: #999999;
  cursor: pointer;
  &:hover {
    background-color: #0361fb;
    color: white;
  }
`;

const _CardDesc = styled.div`
  width: 1104px;
  height: max-content;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
`;
const CardDesc = styled.div`
  width: 1104px;
  height: max-content;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
`;

const Report = styled.text`
  width: 44px;
  height: 28px;
  height: max-content;
  font-size: 16px;
  font-weight: 500;
  color: #999999;
  cursor: pointer;
`;

const ContentDesc = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
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
  ::placeholder {
    color: #999999;
  }
`;
