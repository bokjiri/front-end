import React, { useEffect } from "react";
import styled from "styled-components";
import { Text } from "../elements";

const SearchCard = (props) => {
  const list = props.policyList.policyList;

  return list.map((item, idx) => {
    return (
      <Container key={idx}>
        <Category>{item.desire}</Category>
        <Text margin="5px 0 10px 18px" bold size="20px">{item.name}</Text>
        <Summary>{item.summary}</Summary>
      </Container>
    );
  });
};

export default SearchCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  margin-bottom: 40px;
    justify-content : center;

  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius : 10px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Category = styled.div`
  text-align : center;
  width: min-content;
  padding : 5px;
  height: 20px;
  font-size: 12px;
  margin: 0 0 10px 20px;
  background-color: #72a8fe;
  border-radius : 5px;
  color : white;
  font-weight : 700;
`;

const Summary = styled.div`
  font-size : 15px;
  margin : 0 0 0 18px;
`;
