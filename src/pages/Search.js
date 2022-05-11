import React, { useEffect } from "react";
import { Grid, Button } from "../elements/index";
import { useSelector, useDispatch } from "react-redux";
import { BiSearchAlt } from "react-icons/bi";
import { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import styled from "styled-components";
import SearchCard from "../components/SearchCard";

import { actionCreators as categoryActions } from "../redux/modules/category";

const cookies = new Cookies();

const Search = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const policy_list = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(categoryActions.getPolicyDB(userId));
  }, []);

  return (
    <Container>
      <SearchContainer>

        <SearchBox>
          <BiSearchAlt size="20px" color="#999999"/>
          <input placeholder="검색어 입력 (ex. 청년, 주거...)"></input>
        </SearchBox>
         <SearchButton>검색</SearchButton> 
      </SearchContainer>

      <Box>
        <SearchCard policyList={policy_list} />
      </Box>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  align-items: center;

  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Box = styled.div`
  width: 1024px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top : 60px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: center;
  width : 1024px;
  background-color : none;

  input {
    margin-left : 10px;
    width : 900px;
    border : none;
    height : 40px;
    border-radius : 10px;
    padding : 10px;
    background-color : #7FAAEE;
  }

  input:focus {
    outline : none;
  }

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchButton = styled.button`
  margin-top : 30px;
  width: 174px;
  height: 60px;
  background-color : tomato;
  text-align : center;

  border-radius: 5px;
  border: none;
  background-color: #0361FB;
  color: #FFFFFF;
  font-weight: 700;
  font-size : 13px;

  &:hover {
    cursor: pointer;
    background-color: #72a8fe;
    color: #ffffff;
  }

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
  width: 100%;

  border-radius: 5px;
  color: white;
  height: 50px;
  font-weight: 700;

  @media screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Item = styled.div`
  width: 100px;
  background-color: white;
  height: 50px;
`;
