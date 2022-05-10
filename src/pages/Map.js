import React, { useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;

const Map = () => {

    useEffect(()=> {
        const container = document.getElementById('myMap');
            const options = {
                center : new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
        
            //지도 생성
            const map = new kakao.maps.Map(container, options);

    function locationLoadSuccess(pos){

        //현재 위치
        var currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        //지도 부드럽게 이동
        map.panTo(currentPos);

        //마커 생성
        var marker = new kakao.maps.Marker({
            position : currentPos
        })

        marker.setMap(null);
        marker.setMap(map);
    };

    function locationLoadError(pos){
        alert('위치 정보 가져오기 실패')
    };

    //위치 가져오기 버튼 클릭 시
    function getCurrentPosBtn(){
        navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
    };


        //장소 검색 객체 생성
        const ps = new kakao.maps.services.Places(); 

        //키워드로 장소 검색
        ps.keywordSearch('순천시 풍덕동', placesSearchCB); 

        //키워드 검색 완료 시 호출되는 콜백함수
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                //검색 장소 위치 기준으로 지도 범위를 재설정하기 위해
                //LatLngBounds 객체에 좌표 추가
                for (let i=0; i<data.length; i++) {
                    // displayMarker(data[i]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                //검색 장소 위치 기준으로 지도 범위 재설정
                map.setBounds(bounds);
            } 
        }

        //지도에 마커 표시
        // function displayMarker(place) {

        //     //마커 생성, 지도에 표시
        //     let marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(place.y, place.x) 
        //     });

        //     // 마커에 클릭이벤트를 등록
        // kakao.maps.event.addListener(marker, 'click', function() {
        // // 마커를 클릭하면 장소명이 인포윈도우에 표출
        // infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        // infowindow.open(map, marker);
    // });
    // }
}, []);

  return (
      <>
    <div
      id="myMap"
      style={{ margin: "100px 100px", width: "500px", height: "500px" }}
    >
    </div>
    {/* <button type="button" /> */}
    {/* <p style={{ margin: "0 100px" }} >시작시작</p> */}

    </>
  );
};

export default Map;

// const Box = styled.div`
//     margin-left : 100px;
//     width : 500px;
//     background-color : tomato;
//     height : 100px;
//     overflow : auto;
//     display : flex;
// `;