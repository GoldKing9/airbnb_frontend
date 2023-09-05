import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const ToggleDiv = styled.div<{ value: string }>`
  width: 126px;
  height: 36px;
  background-color: #fc335a;
  border: none;
  border-radius: 40px;
  position: relative;
  margin: 20px auto;
  cursor: pointer;
  
  span {
    position: absolute;
    width: 60px;
    height: 30px;
    border-radius: 40px;
    background-color: white;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    margin-top: 3px;
    margin-bottom: 3px;

    ${({ value }) =>
      value === "host"
        ? "transform: translateX(0px)"
        : "transform: translateX(60px)"
    }
  }
`

const button = styled.button<{ value: string }>`
  position: relative;
  width: 60px;
  height: 36px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
  background-color: transparent;
  transition: color 1s ease;
  outline: none;
  border: none;

  &:active, &:hover {
    outline: none;
    border: none;
  }
`

const HostButton = styled(button)`
  ${({ value }) =>
    value === "host" ? "color: #fc335a;" : null
  }
`

const UserButton = styled(button)`
  ${({ value }) =>
    value === "user" ? "color: #fc335a;" : null
  }
`




const ToggleHandler = () => {
  
  const [value, setValue] = useState<string>("host");

  const changeMode = (type: string) => {
    if (type === "host") {
      setValue("host");
    } else if (type === "user") {
      setValue("user");
    }
  }
  
  return (
    <ToggleDiv value= {value}>
      <span/>
      <HostButton
        type= 'button'
        value= {value}
        onClick={() => changeMode("host")}
      >
        Host
      </HostButton>
      <UserButton
        type= 'button'
        value= {value}
        onClick={() => changeMode("user")}
      >
        User
      </UserButton>
    </ToggleDiv>
  );
};

export default ToggleHandler;