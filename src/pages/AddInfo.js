import React from "react";
import styled from "styled-components";

import {Text, Grid, Button} from "../elements/index";

const AddInfo = () => {
    return(
        <MainWrap>
            <Text size="32px" bold>정보 입력</Text>

            <Container>
                <Grid>
                    <Text bold>성별</Text>
                    <Button width="250px">남성</Button>
                    <Button width="250px">여성</Button>
                </Grid>

                <Grid>
                    <Text bold>나이</Text>
                    <Button width="250px">0 ~ 9세</Button>
                    <Button width="250px">10 ~ 19세</Button>
                    <Button width="250px">20 ~ 29세</Button>
                    <Button width="250px">30 ~ 39세</Button>
                    <Button width="250px">40 ~ 49세</Button>
                    <Button width="250px">50 ~ 59세</Button>
                    <Button width="250px">60 ~ 64세</Button>
                    <Button width="250px">65세 이상</Button>
                </Grid>

                <Grid>
                    <Text bold>대상특성</Text>
                    <Button width="250px">일반</Button>
                    <Button width="250px">장애인</Button>
                    <Button width="250px">국가유공자 등 보훈대상</Button>
                    <Button width="250px">의사상자</Button>
                    <Button width="250px">신용불량자</Button>
                    <Button width="250px">무주택자</Button>
                    <Button width="250px">임산부</Button>
                    <Button width="250px">난임.불임 부부</Button>
                    <Button width="250px">독거노인</Button>
                    <Button width="250px">노숙인</Button>
                    <Button width="250px">저소득층</Button>
                    <Button width="250px">취약계층</Button>
                    <Button width="250px">실업자(취업희망자)</Button>
                    <Button width="250px">저소득근로자</Button>
                    <Button width="250px">영세자영업(창업)자</Button>
                    <Button width="250px">농어업인</Button>
                    <Button width="250px">학생(초등)</Button>
                    <Button width="250px">학생(중고등학교)</Button>
                    <Button width="250px">학생(대학생 이상)</Button>
                    <Button width="250px">미취학</Button>
                    <Button width="250px">한부모가구</Button>
                    <Button width="250px">소년소녀가장가구</Button>
                    <Button width="250px">다문화가구</Button>
                    <Button width="250px">입양가구</Button>
                    <Button width="250px">조손가구</Button>
                    <Button width="250px">다자녀가구</Button>
                    <Button width="250px">새터민 가구</Button>
                    <Button width="250px">아동위탁가정</Button>
                </Grid>

                <Grid>
                    <Text bold>장애유형</Text>
                    <Button width="250px">지체(전환대상)</Button>
                    <Button width="250px">지체(상지절단)</Button>
                    <Button width="250px">지체(하지절단)</Button>
                    <Button width="250px">지체(상지관절)</Button>
                    <Button width="250px">지체(하지관절)</Button>
                    <Button width="250px">지체(상지기능)</Button>
                    <Button width="250px">지체(하지기능)</Button>
                    <Button width="250px">지체(척추)</Button>
                    <Button width="250px">지체(변형)</Button>
                    <Button width="250px">시각</Button>
                    <Button width="250px">청각(전환대상)</Button>
                    <Button width="250px">청각(청력)</Button>
                    <Button width="250px">청각(평형기능)</Button>
                    <Button width="250px">언어</Button>
                    <Button width="250px">지적장애</Button>
                    <Button width="250px">뇌병변</Button>
                    <Button width="250px">자폐성장애</Button>
                    <Button width="250px">정신</Button>
                    <Button width="250px">신장</Button>
                    <Button width="250px">심장</Button>
                    <Button width="250px">호흡기</Button>
                    <Button width="250px">간</Button>
                    <Button width="250px">안면</Button>
                    <Button width="250px">장루.요루</Button>
                    <Button width="250px">뇌전증</Button>
                    <Button width="250px">기타</Button>
                </Grid>

                <Grid>
                    <Text bold>장애정도</Text>
                    <Button width="250px">장애 미해당</Button>
                    <Button width="250px">심한 장애</Button>
                    <Button width="250px">심하지 않은 장애</Button>
                    <Button width="250px">결정보류</Button>
                    <Button width="250px">확인불가</Button>
                </Grid>

                <Grid>
                    <Text bold>가구유형</Text>
                    <Button width="250px">다북화.탈북민</Button>
                    <Button width="250px">다자녀</Button>
                    <Button width="250px">보훈대상자</Button>
                    <Button width="250px">장애인</Button>
                    <Button width="250px">저소득</Button>
                    <Button width="250px">한부모.조손</Button>
                </Grid>

                <Grid>
                    <Text bold>사업목적</Text>
                    <Button width="250px">일자리</Button>
                    <Button width="250px">주거</Button>
                    <Button width="250px">일상생활</Button>
                    <Button width="250px">신체건강 및 보건의료</Button>
                    <Button width="250px">정신건강 및 심리정서</Button>
                    <Button width="250px">보호 및 돌봄.요양</Button>
                    <Button width="250px">보육 및 교육</Button>
                    <Button width="250px">문화 및 여가</Button>
                    <Button width="250px">안전 및 권익보장</Button>
                </Grid>
            </Container>
            <Button margin="20px 0 20px 0" radius="5px" backgroundColor="silver">완료</Button>

        </MainWrap>

    );
}

export default AddInfo;

const MainWrap = styled.div`
    margin : 0 auto;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
`;

const Container = styled.div`
    width : 500px;
    height : 100%;
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    border : 1px solid silver;
`;
