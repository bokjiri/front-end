import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Text } from "../elements/index";

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

export default function MainCard() {


  const isPc = useMediaQuery({
    query : "(min-width:767px)"
  });

  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });



  return (
    <>
    

{
  isPc &&

  <Container>
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
        <SwiperSlide>
            <CardBox>
                <Text>맞춤 정책 제목1</Text>
                <span>간략내용1</span>
            </CardBox>
        </SwiperSlide>
        <SwiperSlide onClick={()=>{history.push("/login")}}>맞춤 정책 2</SwiperSlide>
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

}
      
    

    {
      isMobile && 
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
        <SwiperSlide onClick={()=>{history.push("/login")}}>맞춤 정책 2</SwiperSlide>
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
    } 
   

    </>
  );
}

const Container = styled.div`
    background: #eee;
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
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;