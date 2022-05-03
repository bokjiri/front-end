import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { Text, Grid, Button } from "../elements/index";

import { history } from "../redux/configureStore";

import { actionCreators as infoActions } from "../redux/modules/info";

const AddInfo = () => {
  const dispatch = useDispatch();
  //////////userId
  const userId = localStorage.getItem("userId");

  const [age, setAge] = useState([]);
  const [obstacle, setObstacle] = useState([]);
  const [target, setTarget] = useState([]);
  console.log("생애주기", age);
  console.log("장애유형", obstacle);
  console.log("가구유형", target);

  //////////////////////////////////////////////////////////////
  const CreateLifeCycle = (e, item) => {
    let newAge = age.findIndex((i) => i === item);

    if (newAge === -1) {
      setAge([...age, item]);
    } else {
      setAge(age.filter((a) => a !== item));
    }
    return;
  };

  const CreateObstacle = (e, item) => {
    let newObstacle = obstacle.findIndex((i) => i === item);

    if (newObstacle === -1) {
      setObstacle([...obstacle, item]);
    } else {
      setObstacle(obstacle.filter((o) => o !== item));
    }
    return;
  };

  const CreateTarget = (e, item) => {
    let newTarget = target.findIndex((i) => i === item);

    if (newTarget === -1) {
      setTarget([...target, item]);
    } else {
      setTarget(target.filter((t) => t !== item));
    }

    return;

  };

  const categoryList = {
    lifeCycle: [
      "영유아",
      "아동",
      "청소년",
      "청년",
      "중장년",
      "노년",
      "임신·출산",
    ],

    obstacle: [
      "지체(전환대상)",
      "지체(상지절단)",
      "지체(하지절단)",
      "지체(상지관절)",
      "지체(하지관절)",
      "지체(상지기능)",
      "지체(하지기능)",
      "지체(척추)",
      "지체(변형)",
      "시각",
      "청각(전환대상)",
      "청각(청력)",
      "청각(평형기능)",
      "언어",
      "지적장애",
      "뇌병변",
      "자폐성장애",
      "정신",
      "신장",
      "심장",
      "호흡기",
      "간",
      "안면",
      "장루·요루",
      "뇌전증",
      "기타",
    ],

    target: [
      "다북화.탈북민",
      "다자녀",
      "보훈대상자",
      "장애인",
      "저소득",
      "한부모·조손",
    ],
  };

  return (
    <MainWrap>

        <TextBox>
          ✏️ 정보를 선택해주세요!
        </TextBox>


      <Container>
        <Grid>
          <Text bold margin="20px">
            생애주기
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.lifeCycle).map((item, idx) => {
              return (
                <Btn
                  key={idx}
                  color={
                      age.findIndex((i) => i === item[1]) === -1 ? "#EFEFEF" : "#0361FB"
                  }  
                  value={item[0]}
                  onClick={(e) => {
                    CreateLifeCycle(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>


          <Text bold margin="20px">
            장애유형
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.obstacle).map((item, idx) => {
              return (
                <Btn
                  key={idx}
                  color={
                      obstacle.findIndex((i) => i === item[1]) === -1 ? "#EFEFEF" : "#0361FB"
                  }  
                  value={item[0]}
                  onClick={(e) => {
                    CreateObstacle(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>


          <Text bold margin="20px">
            가구유형
          </Text>
          <CategoryBox>
            {Object.entries(categoryList.target).map((item, idx) => {
              return (
                <Btn
                  key={idx}
                  color={
                    target.findIndex((i) => i === item[1]) === -1 ? "#EFEFEF" : "#0361FB"
                  }  
                  value={item[0]}
                  onClick={(e) => {
                    CreateTarget(e, item[1]);
                  }}
                >
                  {item[1]}
                </Btn>
              );
            })}
          </CategoryBox>


        </Grid>
      </Container>
      <CompleteBtn
        onClick={() => {
          dispatch(infoActions.addInfoDB(userId, age, obstacle, target));
          //console.log(age, obstacle, target);
          //history.push("/main")
        }}
      >
        완료
      </CompleteBtn>
    </MainWrap>
  );
};

export default AddInfo;

const MainWrap = styled.div`
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 20px 10px;
  box-shadow: 0px 0px 20px 5px #f7f5f2;
  border-radius: 7px;
  padding : 20px;
`;

const CategoryBox = styled.div`
  padding: 0 20px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`;

const Btn = styled.button`
  width: 175px;
  height : 50px;
  margin: 7px 7px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.color};
  color : ${(props) => props.color === "#0361FB" ? "#FFFFFF" : "darkgrey"};
  font-weight : 900;
  
  &:hover {
    cursor : pointer;
  }
`;

const CompleteBtn = styled.button`
  width: 175px;
  height : 50px;
  margin: 7px 7px;
  border-radius: 5px;
  border: none;
  background-color: #EFEFEF;
  color : darkgrey;
  font-weight : 900;

  &:hover {
    cursor : pointer;
    background-color : #72A8FE;
    color : #FFFFFF;
    transparent : 0.8;
  }

  &:focus {
    background-color : #0361FB;
    color : #FFFFFF;
    
  }
`;

const TextBox = styled.div`
  width : 100%;
  display : flex;
  font-size : 26px;
  font-weight : 700;
  margin-left : 20px;
`;


