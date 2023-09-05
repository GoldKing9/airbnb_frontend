import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {setCookie} from '../utils/Cookies.ts'
import Logo from './Logo';

interface SigninProps {
    switchToSignup: () => void;
    setIsOpen: (open: boolean) => void;
}

const Signin: React.FC<SigninProps> = ({switchToSignup, setIsOpen}) => {
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

    const onSubmit = async () => {
        await axios
            .post('http://3.39.233.168:8080/api/user/login', {
                email: form.email,
                password: form.password
            })
            .then(function (res) {
                console.log(res.headers);
                const accessToken = res.headers.authorization;

                if (accessToken) {
                    setCookie("accessToken", accessToken, {
                        path: "/",
                        sameSite: "strict",
                    });
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log(res);
                alert("로그인에 성공했습니다.");
                setIsOpen(false);
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
                            <CloseButton onClick={() => setIsOpen(false)}>
                                <StyledFontAwesomeIcon icon={faX}/>
                            </CloseButton>
                        </ModalHeaderDiv>
                        <SignupHeader>로그인</SignupHeader>
                        <ModalHeaderDiv></ModalHeaderDiv>
                    </ModalHeader>
                    <ModalForm>
                        <Logo>내집어때</Logo>
                        <ModalInput placeholder='이메일' type='email' onChange={handleEmail}/>
                        <ModalInput placeholder='비밀번호' type='password' onChange={handlePassword}/>
                        <ModalSubmit onClick={onSubmit}>로그인</ModalSubmit>
                        <ModalSignupPath onClick={switchToSignup}>회원가입 하기</ModalSignupPath>
                    </ModalForm>
                </ModalView>
            </ModalBackdrop>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh; // 1. 전체 화면
  display: flex; // 2. ModalView 중앙으로 모셔오고
  justify-content: center; // 2
  align-items: center; // 2 
  position: fixed; // 3. 띄우고
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1000;
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
`

const ModalView = styled.div`
  width: 500px;
  height: 700px;
  margin: auto;
  padding: 0 0 24px;
  border-radius: 20px;
  background-color: white;
`;

const ModalHeader = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #ebebeb solid;
`;

const ModalHeaderDiv = styled.div`
    margin: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
  left: 20px;

  &:active {
    outline: none;
  }
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

  input {
    &:nth-child(2) {
      margin-bottom: 12px;
    }
  }
`;

const ModalInput = styled.input.attrs({required: true})`
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
  }
;
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
  cursor: pointer;
`;

const ModalSignupPath = styled.div`
  text-decoration: none;
  color: #fc335a;
  margin-top: 60px;
  cursor: pointer;
`


export default Signin;