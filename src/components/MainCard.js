import React, { useEffect, useRef, useState } from "react";
import post, { actionCreators as bookActions } from "../redux/modules/bookMark";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Text } from "../elements/index";
import { ReactIcon } from "../Icons/Icon";
import ShareIcon from "@mui/icons-material/Share";

import { history } from "../redux/configureStore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "../css/mainCard.css";

// import required modules
import { Grid, Pagination } from "swiper";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from "@mui/icons-material";

export default function MainCard(props) {
  const userId = localStorage.getItem("userId");
  console.log("maincard의", props);
  const dataId = 52;
  const history = useHistory();
  const dispatch = useDispatch();
  const add = () => {
    dispatch(bookActions.addBookFB(userId, dataId));
  };
  const bookdelete = () => {
    dispatch(bookActions.deleteBookFB(dataId));
  };
  const isPc = useMediaQuery({
    query: "(min-width:767px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const [bookMark, setbookMark] = useState(false);

  return (
    <>
      {isPc && (
        <Container>
          <button onClick={add}>여기</button>
          <button onClick={bookdelete}>삭제</button>
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
            // breakpoints={{
            //   400: {
            //     slidesPerView: 1,
            //   },
            // }}
          >
            {/* map */}
            {props.policyList.map((x, idx) => {
              return (
                <SwiperSlide>
                  <CardBox key={idx}>
                    <Text>{x.obstacle}</Text>
                    <span
                      onClick={() => {
                        history.push(`/detail/${x.dataId}`);
                      }}
                    >
                      {x.target}
                    </span>
                    <p>
                      <button onClick={() => setbookMark(!bookMark)}>
                        {bookMark === true ? (
                          <ReactIcon.BsBookmarkCheckFill />
                        ) : (
                          <ReactIcon.BsBookmarkCheck />
                        )}
                      </button>

                      <ShareIcon />
                    </p>
                  </CardBox>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      )}

      {isMobile && (
        <Container>
          <Swiper
            slidesPerView={1}
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
            {/* map */}
            <SwiperSlide>
              <CardBox>
                <Text>맞춤 정책 제목1</Text>
                <span>간략내용1</span>
              </CardBox>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                history.push("/login");
              }}
            >
              맞춤 정책 2
            </SwiperSlide>
            <SwiperSlide>맞춤 정책 3</SwiperSlide>
            <SwiperSlide>맞춤 정책 4</SwiperSlide>
            <SwiperSlide>맞춤 정책 5</SwiperSlide>
            <SwiperSlide>맞춤 정책 6</SwiperSlide>
            <SwiperSlide>맞춤 정책 7</SwiperSlide>
            <SwiperSlide>맞춤 정책 8</SwiperSlide>
            <SwiperSlide>맞춤 정책 9</SwiperSlide>
            <SwiperSlide>맞춤 정책 10</SwiperSlide>
          </Swiper>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  padding: 10px;
`;

// const MobileContainer = styled.div`

//   width : 360px;
//     display : flex;
//     flex-direction : column;
//     justify-content : center;
//     align-items : center;

//     background: #eee;
//     font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
//     font-size: 14px;
//     color: #000;
//     padding: 10px;
// `;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
