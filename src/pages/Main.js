import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import MainCard from "../components/MainCard";

import { actionCreators as infoActions } from "../redux/modules/info";

import News from "../components/News";
import DndShop from "../components/DndShop";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Main = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const dispatch = useDispatch();

  const info_list = useSelector((state) => state.info.list);
  const policy_list = useSelector((state) => state.info.policyList);
  console.log(policy_list);
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
    dispatch(infoActions.getPolicyDB(userId));
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
        <h4>나에게 맞는 정책을 확인해보세요!</h4>
        <CategoryBox>
          {category.map((table, index) => (
            <Button
              key={index}
              backgroundColor="#ffffff"
              box-shadow="0 4px 14px rgba(0,0,0,0.1)"
              color="#999999"
              width="171px"
              border-radius="10px"
              margin="10px"
            >
              {table}
            </Button>
          ))}
          {/* <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            📄 일자리
          </Button>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            🏠 주거 및 일상생활
          </Button>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            💪🏻 건강
          </Button>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            👪 교육 및 돌봄
          </Button>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            ⛑ 안전 및 권익보장
          </Button>
          <Button
            backgroundColor="#ffffff"
            box-shadow="0 4px 14px rgba(0,0,0,0.1)"
            color="#999999"
            width="171px"
            border-radius="10px"
            margin="10px"
          >
            기타
          </Button> */}
        </CategoryBox>
        <DndShop policyList={policy_list} userId={userId} />
        <MainCard policyList={policy_list} />
        <h4>새로운 복지 뉴스를 확인해보세요!</h4>
        <News />
        {/* <Like policyList={policy_list} /> */}
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
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CategoryBox = styled.div`
  background: rgba(114, 168, 254, 0.1);
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 10px;
  min-width: 800px;

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
