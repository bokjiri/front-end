import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from "../elements/index";
import { history } from "../redux/configureStore";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import MainCard from "../components/MainCard";

import { actionCreators as infoActions } from "../redux/modules/info";

import { actionCreators as postActions } from "../redux/modules/post";

import Like from "../components/Like";
import DndShop from "../components/DndShop";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Main = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  
  const info_list = useSelector((state) => state.info.list);
  const policy_list = useSelector((state) => state.info.policyList);
  console.log(policy_list);


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

      <CategoryBox>
        <Button backgroundColor="#eee" color="black" width="150px">
          주거
        </Button>
        <Button backgroundColor="#eee" color="black" width="150px">
          생계
        </Button>
        <Button backgroundColor="#eee" color="black" width="150px">
          취업
        </Button>
        <Button backgroundColor="#eee" color="black" width="150px">
          가족
        </Button>
        <Button backgroundColor="#eee" color="black" width="150px">
          건강
        </Button>
      </CategoryBox>
      
      {/* <DndShop post_list={post_list} />
      <MainCard post_list={post_list} />
      <Like post_list={post_list} /> */}
    </Container>
  
  )}
  else {
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
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 10px;
  min-width: 800px;

  @media screen and (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width : 100px;
    }
  }
`;
