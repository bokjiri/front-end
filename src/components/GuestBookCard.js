import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FeedBtn from "./FeedBtn";

import useSWR from "swr";
import Loader from "../elements/Loader";
import { FeedFetcher } from "../shared/Fetcher";

import { reportContentDB } from "../redux/modules/guestBook";

const GuestBookCard = (props) => {
  const dispatch = useDispatch();
  const nickname = localStorage.getItem("nickName");

  const Feed_Card = props.Feed_list;

  const { data, error } = useSWR(`/api/guestbooks/`, FeedFetcher);

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
                  <Report onClick={() => dispatch(reportContentDB(x.feedId))}>
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
