import React, {useEffect} from "react";
import {Grid, Button} from "../elements/index";
import { useSelector, useDispatch } from "react-redux";
import { BiSearchAlt } from "react-icons/bi";
import { history } from "../redux/configureStore";
import Cookies from "universal-cookie";
import styled from "styled-components";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styles } from '@mui/material/styles';
import { apis } from "../shared/axios";

import { actionCreators as infoActions } from "../redux/modules/info";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    // ...theme.typography.body2,
    // padding: theme.spacing(1),
    padding : '20px',
    textAlign: 'center',
    marginTop : '20px',
    // color: theme.palette.text.secondary,
  }));

const cookies = new Cookies();

const Search = () => {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();


  useEffect(() => {
    apis
    .tokenTest()
    .then((response) => {
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    });


    dispatch(infoActions.getPolicyDB(userId));
  }, []);

  useEffect(() => {
    apis
    .newsGet()
    .then((response) => {
      console.log(response);
    })
    .catch((err)=>{
      console.log(err);
    });
  })

    return(
            <Container>
              <SearchContainer>
                <SearchButton
                  onClick={() => {
                    history.push("/search");
                  }}
                >
                  <SearchBox>
                    <BiSearchAlt size="20px" />
                    <input placeholder="검색어 입력"></input>
                  </SearchBox>
                </SearchButton>
              </SearchContainer>
        
              <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
        
            </Container>
          
    );





}

export default Search;

const Container = styled.div`
  margin-top : 100px;
  width: 100%;
  display: flex;
  align-items: center;

  flex-direction: column;
  height : 100%;

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
