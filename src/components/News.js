import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { actionCreators as markActions } from "../redux/modules/bookMark";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "../css/mainCard.css";

// import required modules
import { Grid, Pagination } from "swiper";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const news_list = useSelector((state) => state.bookMark.news);
  console.log(news_list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(markActions.getNewsFB());
  }, []);
  return (
    <>
      <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper"
      >
        {news_list.map((x, idx) => (
          <SwiperSlide key={idx}>
            <CardBox
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.open(x.link);
              }}
            >
              <Txt_line>{x.title}</Txt_line>
              <Txt_line>{x.desc}</Txt_line>
              <div>{x.date}</div>
            </CardBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Txt_line = styled.div`
  width: 150px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
