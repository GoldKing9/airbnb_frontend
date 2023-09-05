import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const HostTab = () => {
  
  useEffect(() => {
    axios.get('http://3.39.233.168:8080/api/auth/host', {
      params: {
        page: 1,
        size: 4
      }
    })
    .then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  
  
  const [currentTab, setCurrentTab] = useState(0);
  // const [currentDiv, setCurrentDiv] = useState(null);

  const menuArr = [
    { name: '등록된 숙소 (0)건'},
    { name: '예약중 (0)건'},
    { name: '이용 완료 (0)건'},
    { name: '예약 취소 (0)건'},
    { name: '리뷰 조회 (0)건'},
    { name: '결제 내역 (0)건'}
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  }
  
  return (
    <>
      <TabMenu>
        {menuArr.map((el, index) => (
          <li className= {index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}>{el.name}</li>
        ))}
      </TabMenu>
      <TabContainer></TabContainer>
    </>
  );
};

export default HostTab;

const TabMenu = styled.ul`
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top : 30px;

  .submenu {
    display: flex;
    justify-content: center;
    width: calc(1000px / 6);
    transition: 0.5s;
    margin-right: 40px;
    height: 35px;
    line-height: 35px;
    border-radius: 17px;
    color: #fc335a;
    border: 2px #fc335a solid;
    font-size: 14px;
    cursor: pointer;
  }

  .focused {
    background-color: #fc335a;
    color: white
  }
`
const TabContainer = styled.div`
  width: 1000px;
  height: 250px;
  margin-top: 50px;
  border-radius: 20px;
  background-color: #f7f7f7;
`