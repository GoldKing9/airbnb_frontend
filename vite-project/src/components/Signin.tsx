import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCookie } from '../utils/Cookies.ts'

const Signin = () => {
  
  interface form {
    email: null | string;
    password: null | string;
  }

  const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        result = fn(...args);
      }, delay);
      return result;
    };
  };

  const [form, setForm] = useState<form>({
    email: "",
    password: ""
  });
  
  const handleEmail = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentEmail = e.target.value;
    setForm({...form, email: currentEmail});
    console.log(currentEmail);
  }, 800);

  const handlePassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    
    const currentPassword = e.target.value;
    setForm({...form, password: currentPassword});
    console.log(currentPassword);
  }, 800);

  const onSubmit = async() => {
    await axios
    .post('http://3.39.233.168:8080/api/user/login', {
      email: form.email,
      password: form.password
    })
    .then(function (res) {
      console.log(res.headers);
      const accessToken  = res.headers.authorization;

      if (accessToken) {
        setCookie("accessToken", `JWT ${accessToken}`, {
          path: "/",
          sameSite: "strict",
        });
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      console.log(res);
      alert("로그인에 성공했습니다.");
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
      setForm({...form, email: ""});
      setForm({...form, password: ""});
    });
  };

  return (
    <ModalContainer>
      <ModalBackdrop>
        <ModalView>
          <ModalHeader>
            <ModalHeaderDiv>
              <CloseButton>
                <StyledFontAwesomeIcon icon={faX}/>
              </CloseButton>
            </ModalHeaderDiv>
            <SignupHeader>로그인</SignupHeader>
            <ModalHeaderDiv></ModalHeaderDiv>
          </ModalHeader>
          <ModalForm>
            <ModalH1>내집어때</ModalH1>
            <ModalInput placeholder='이메일' type='email' onChange={handleEmail}/>
            <ModalInput placeholder='비밀번호' type='password' onChange={handlePassword}/>
            <ModalSubmit onClick={onSubmit}>로그인</ModalSubmit>
            <ModalSignupPath>회원가입 하기</ModalSignupPath>  {/*회원가입 페이지 렌더링하는 코드 넣어줘야함. */}
          </ModalForm>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>  
  );
};

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;  // 1. 전체 화면
  display: flex;  // 2. ModalView 중앙으로 모셔오고
  justify-content: center;  // 2
  align-items: center;    // 2 
  position: fixed; // 3. 띄우고
  top: 0;
  left: 0;
  
  box-sizing: border-box;
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%; // 이미 꽉 차서 중앙이 의미가 없지!
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`

const ModalView = styled.div`
  width: 500px;   
  height: 700px; 
  margin: auto;
  padding: 0px 0px 24px;   
  border-radius: 20px;
  background-color: white;
  z-index: 10000;
`;

const ModalHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px #ebebeb solid;
`;

const ModalHeaderDiv = styled.div`
  margin: zero;
  flex: 1;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 24px;
`;

const SignupHeader = styled(ModalHeaderDiv)`
  text-align: center;
  font-weight: 700;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
`;

const ModalForm = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 96px;
  align-items: center;

  & > h1 {
    align-items: left;
  }

  input {
    &:nth-child(2) {
      margin-bottom: 12px;
    }
  }
`;

const ModalInput = styled.input.attrs({ required: true })`
  display: block;
  width: 406px;
  height: 50px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  text-indent: 12px;

  &:focus {
    border: 2px orange solid;
    outline: none;
  };
`;

const ModalH1 = styled.h1`
  text-align: center;
  font-family: 'Single Day', cursive;
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #fc335a;
  color: white;
  border-radius: 20px 100px 20px 100px;
  margin-bottom: 40px;
`;

const ModalSubmit = styled.button`
  display: block;
  width: 408px;
  height: 50px;
  background-color: #fc335a;
  text-align: center;
  margin-top: 30px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  pointer: cursor;
`;

const ModalSignupPath = styled.div`
  text-decoration: none;
  color: #fc335a;
  margin-top: 60px;
  pointer: cursor;
` 



export default Signin;