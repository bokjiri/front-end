import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Grid, Button } from "../elements/index";

const AddInfo = () => {

  const [color, setColor] = useState("silver");


  const age1 = ["영유아", "아동", "청소년", "청년"];

  const subject1 = [
    "일반",
    "장애인",
    "국가유공자 등 보훈대상",
    "의사상자",
    "신용불량자",
    "무주택자",
    "임산부",
    "난임.불임 부부",
    "독거노인",
    "노숙인",
    "여성",
    "저소득층",
    "취약계층",
    "실업자(취업희망자)",
    "저소득근로자",
    "영세자영업(창업)자",
    "농어업인",
    "학생(초등)",
    "학생(중고등학교)",
    "학생(대학생이상)",
    "미취학",
    "한부모가구",
    "소년소녀가장가구",
    "다문화가구",
    "입양가구",
    "조손가구",
    "다자녀가구",
    "새터민가구",
    "아동위탁가정",
  ];

  const subject2 = [
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
    "장루.요루",
  ];

  const subject3 = ["다북화.탈북민", "다자녀", "보훈대상자", "장애인"];

  return (
    <MainWrap>
      <Grid>
        <Text size="26px" bold>
          정보 입력
        </Text>
      </Grid>

      <Container>
        <Grid>
          <Text bold margin="20px">
            생애주기
          </Text>
          <CategoryBox>
            {age1.map((item, idx) => (
            //   <Button key={idx} width="175px" margin="10px 0" radius="5px"  backgroundColor={color} _onClick={()=>{console.log(item)}}>
            <Button key={idx} width="175px" margin="10px 0" radius="5px"  backgroundColor={color}>
                {item}
              </Button>
            ))}
          </CategoryBox>

          <Grid is_flex margin="10px 0">
            <Btn value="중장년" onClick={(e)=>{console.log(e.target.value)}} >
              중장년
            </Btn>
            <Btn width="175px" margin="0 20px 0 0" radius="5px">
              노년
            </Btn>
            <Btn width="175px" radius="5px">
              임신.출산
            </Btn>
          </Grid>
        </Grid>

        <Grid>
          <Text bold margin="20px">
            대상특성
          </Text>
          <CategoryBox>
            {subject1.map((item) => (
              <Btn width="175px" margin="10px 0" radius="5px">
                {item}
              </Btn>
            ))}
          </CategoryBox>
        </Grid>

        <Grid>
          <Text bold margin="20px">
            장애유형
          </Text>
          <CategoryBox>
            {subject2.map((item) => (
              <Btn width="175px" margin="10px 0" radius="5px">
                {item}
              </Btn>
            ))}
          </CategoryBox>
          <Grid is_flex margin="10px 0">
            <Btn width="175px" margin="0 20px 0 0" radius="5px">
              뇌전증
            </Btn>
            <Btn width="175px" radius="5px">
              기타
            </Btn>
          </Grid>
        </Grid>

        <Grid>
          <Text bold margin="20px">
            가구유형
          </Text>
          <CategoryBox>
            {subject3.map((item) => (
              <Btn width="175px" margin="10px 0" radius="5px">
                {item}
              </Btn>
            ))}
          </CategoryBox>
          <Grid is_flex margin="10px 0">
            <Btn width="175px" margin="0 20px 0 0" radius="5px">
              저소득
            </Btn>
            <Btn width="175px" radius="5px">
              한부모.조손
            </Btn>
          </Grid>
        </Grid>
      </Container>
      <Btn
        margin="20px 0 20px 0"
        radius="5px"
        width="170px"
        color="white"
        backgroundColor="silver"
      >
        완료
      </Btn>
    </MainWrap>
  );
};

export default AddInfo;

const MainWrap = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Container = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin: 10px;
  box-shadow: 0px 0px 20px 5px #f7f5f2;
  border-radius: 7px;
`;

const CategoryBox = styled.div`
  padding: 0 20px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
    width : 175px;
    margin : 0 20px 0 0;
    border-radius : 5px;
    border : none;
`;