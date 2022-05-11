import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { actionCreators as markActions } from "../redux/modules/bookMark";

const NewsCard = () => {
  const dispatch = useDispatch();
  const news_list = useSelector((state) => state.bookMark.news);
  console.log("뉴스카드 리스트", news_list);
  useEffect(() => {
    dispatch(markActions.getNewsFB());
  }, []);
  return (
    <Container>
      {news_list.map((x, idx) => (
        <NewsBox
          key={idx}
          onClick={() => {
            window.open(x.link);
          }}
        >
          <NewsImg src={x.image} />
          <NewsView>
            <NewsHead>{x.title}</NewsHead>
            <NewsDesc>{x.desc}</NewsDesc>
          </NewsView>

          <NewsCreateAt>{x.date}</NewsCreateAt>
        </NewsBox>
      ))}
    </Container>
  );
};

export default NewsCard;

const Container = styled.div`
  width: 1280px;
  height: 940px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const NewsBox = styled.div`
  align-items: center;
  width: 276px;
  height: 450px;
  cursor: pointer;
  margin-right: 30px;
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;

const NewsImg = styled.img`
  width: 276px;
  height: 198px;
  margin-bottom: 20px;
  margin: 0;
`;

const NewsView = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NewsHead = styled.h5`
  width: 236px;
  font-weight: bold;
  font-size: 20px;
  line-height: 34.75px;
  margin: 0;
  margin-bottom: 20px;
`;

const NewsDesc = styled.div`
  width: 236px;
  height: 69px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 23.17px;
  font-size: 16px;
  color: #666666;
  margin-bottom: 20px;
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;

const NewsCreateAt = styled.div`
  width: 84px;
  height: 23px;
  float: right;
  font-size: 16px;
  line-height: 23.17px;
  color: #999999;
  font-style: normal;
  font-weight: 400;
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;
