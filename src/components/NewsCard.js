import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { actionCreators as markActions } from "../redux/modules/bookMark";

const NewsCard = () => {
  const dispatch = useDispatch();
  const news_list = useSelector((state) => state.bookMark.news);
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
  margin-bottom: 100px;
  margin-left: 40px;
`;

const NewsBox = styled.div`
  align-items: center;
  width: 276px;
  height: 410px;
  cursor: pointer;
  margin-right: 30px;
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
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
  border-radius: 16px 16px 0px 0px;
`;

const NewsView = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NewsHead = styled.h5`
  width: 236px;
  height: 65px;
  font-weight: bold;
  font-size: 20px;
  line-height: 34.75px;
  margin: 20px 0 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NewsDesc = styled.div`
  width: 236px;
  height: 69px;
  overflow: hidden;
  margin-bottom: 10px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 23.17px;
  font-size: 16px;
  color: #666666;
  /* margin-bottom: 10px; */
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;

const NewsCreateAt = styled.div`
  width: 73px;
  height: 23px;
  float: right;
  font-size: 14px;
  line-height: 20.27px;
  color: #999999;
  font-weight: 400;
  &:hover {
    background: #ffffff;
    color: #0361fb;
  }
`;
