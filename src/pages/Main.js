import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import MainCard2 from "../components/MainCard2";

import { actionCreators as infoActions } from "../redux/modules/info";
import { actionCreators as categoryActions } from "../redux/modules/category";

import DndShop from "../components/DndShop";

import Cookies from "universal-cookie";
import { useHistory, useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
const cookies = new Cookies();

const Main = () => {
  const history = useHistory();
  const params = useParams();
  const categoryName = params.category;
  console.log(categoryName);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const dispatch = useDispatch();

  const info_list = useSelector((state) => state.info.list);
  const policy_list = useSelector((state) => state.category);
  console.log("카테고리", policy_list);
  const [category, setCategory] = useState([
    "전체",
    "📄 일자리",
    "🏠 주거 및 일상생활",
    "💪🏻 건강",
    "👪 교육 및 돌봄",
    "⛑ 안전 및 권익보장",
    "기타",
  ]);

  console.log("인포", info_list);

  useEffect(() => {
    dispatch(infoActions.getInfoDB(userId));
    dispatch(categoryActions.getPolicyDB(userId));
  }, []);

  if (cookies.get("userToken")) {
    return (
      <Container>
        <SearchContainer>
          <SearchButton
            onClick={() => {
              history.push("/search");
            }}
          >
            <SearchBox>
              <BiSearchAlt size="20px" />
              <span>&nbsp;&nbsp;정책을 검색해보세요!</span>
            </SearchBox>
          </SearchButton>
        </SearchContainer>
        <MypolicyCheck>나에게 맞는 정책을 확인해보세요!</MypolicyCheck>
        <CategoryBox>
          {category.map((table, index) => (
            <Button
              key={index}
              backgroundColor="#ffffff"
              box-shadow="0 4px 14px rgba(0,0,0,0.1)"
              color="#999999"
              width="171px"
              radius="10px"
              margin="10px"
              _onClick={() => {
                history.push(`/main/${table}`);
              }}
            >
              {table}
            </Button>
          ))}
        </CategoryBox>
        <DndShop policyList={policy_list} userId={userId} />
        {/* <MainCard categoryName={categoryName} /> */}
        {/* <div
          onClick={() => {
            history.push("/search");
          }}
        >
          전체보기 >
        </div> */}
        <MainCard2 categoryName={categoryName} />
        <MynewsCheck>새로운 복지 뉴스를 확인해보세요!</MynewsCheck>
        <NewsCard />
      </Container>
    );
  } else {
    history.replace("/");
  }
  return null;
};

export default Main;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 100px;
  width: 100vw;
  height: 297px;
  background: rgba(114, 168, 254, 0.1);
  border: 1px solid blue;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchButton = styled.div`
  width: 500px;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  background-color: #4b7be5;
  border-radius: 5px;
  color: white;
  height: 50px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
    color: #72a8fe;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MypolicyCheck = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  border: 1px solid red;
`;
const MynewsCheck = styled.div`
  font-weight: 700;
  font-size: 34px;
  line-height: 49px;
  letter-spacing: 0.0025em;
  border: 1px solid red;
  margin-bottom: 40px;
  align-items: flex-start;
`;

const CategoryBox = styled.div`
  background: rgba(114, 168, 254, 0.1);
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  min-width: 800px;
  &:hover {
    color: #72a8fe;
  }

  @media screen and (max-width: 767px) {
    background: rgba(114, 168, 254, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100px;
    }
  }
`;
