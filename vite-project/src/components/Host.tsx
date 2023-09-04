import React from 'react';
import styled from 'styled-components';
import HostTab from '../utils/HostTab';


const Host = () => {
  return (
    <HostContainer>
      <HostingDiv>
        <HostH1>나의 공간을 Hosting하고 수익을 창출해 보세요!</HostH1>
        <HostingButton>숙박 등록</HostingButton>
      </HostingDiv>
      <HostingAdminDiv>
        <HostingAdminH1>나의 숙소를 손쉽게 관리해 보세요!</HostingAdminH1>
        <HostTab></HostTab>
      </HostingAdminDiv>
    </HostContainer>
    
  );
};

export default Host;

const HostContainer = styled.section`
  width: 75%;
  height: 630px;
  margin-left: 10px;
  border: 1px rgba(0, 0, 0, 0.04) solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`
const HostingDiv = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
`

const HostH1 = styled.h1`
  font-size: 40px;
  display: inline-block;
  margin-top: 50px
`

const HostingButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: #fc335a;
  color: white;
  margin-top: 50px;
  margin-left: 50px;
  font-weight: bolder;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`

const HostingAdminDiv = styled.div`
  width: 1000px;
  height: 500px;
  margin-top: 20px;
  padding-top: 20px;
`

const HostingAdminH1 = styled.h1`
  height: 40px;
`


