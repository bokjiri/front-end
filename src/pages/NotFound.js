import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
      <Box>
        <div>존재하지 않는 페이지 입니다!</div>
      </Box>
  );
};

export default NotFound;

const Box = styled.div`
  display: flex;
  justify-content : center;
  align-items : center;
  width: 100vw;

  div {
    margin-top: 100px;
    height : 400px;
  }
`;
