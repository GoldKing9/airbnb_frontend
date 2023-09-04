import React, {useState} from 'react';
import styled from 'styled-components';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Logo from './Logo';

interface SignupProps {
    switchToSignin: () => void;
    setIsOpen: (open: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({switchToSignin, setIsOpen}) => {

    interface form {
        email: null | string;
        password: null | string;
        username: null | string;
        birth: null | string;
    }

    interface isValidForm {
        isValidEmail: boolean;
        isValidPassword: boolean;
        isValidUsername: boolean;
        isValidBirth: boolean;
    }

    interface formMessage {
        formEmailMessage: null | string;
        formPasswordMessage: null | string;
        formUsernameMessage: null | string;
        formBirthMessage: null | string;
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
        password: "",
        username: "",
        birth: ""
    });

    const [isValid, setIsValid] = useState<isValidForm>({
        isValidEmail: false,
        isValidPassword: false,
        isValidUsername: false,
        isValidBirth: false
    });

    const [message, setMessage] = useState<formMessage>({
        formEmailMessage: "",
        formPasswordMessage: "",
        formUsernameMessage: "",
        formBirthMessage: ""
    });

    const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegexp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,14}$/;
    const usernameRegexp = /^(?!.*[ㄱ-ㅎㅏ-ㅣ])(?!^[ㄱ-ㅎㅏ-ㅣ]*$)(?!.*[aeiouAEIOU])[ㄱ-ㅎㅏ-ㅣ가-힣]{2,5}$/;
    const birthRegexp = /^(?!0000)(?!00)(?:\d{2}(?:0[48]|[2468][048]|[13579][26])|[13579][26]00)-02-29$|^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])$/;

    const isValidEmail = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

        const currentEmail = e.target.value;
        setForm({...form, email: currentEmail});
        console.log(currentEmail);

        if (!emailRegexp.test(currentEmail)) {
            setIsValid({...isValid, isValidEmail: false});
            setMessage({...message, formEmailMessage: "이메일 형식에 맞게 작성해주세요."});
        } else {
            setIsValid({...isValid, isValidEmail: true});
            setMessage({...message, formEmailMessage: "유효한 이메일 형식입니다."});
        }
    }, 800);

    const isValidPassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

        const currentPassword = e.target.value;
        setForm({...form, password: currentPassword});
        console.log(currentPassword);

        if (!passwordRegexp.test(currentPassword)) {
            setIsValid({...isValid, isValidPassword: false});
            setMessage({...message, formPasswordMessage: "영문 소문자, 숫자 포함 4자 이상 14자 이하로 입력해주세요."});
        } else {
            setIsValid({...isValid, isValidPassword: true});
            setMessage({...message, formPasswordMessage: "유효한 비밀번호 형식입니다."});
        }
    }, 800);

    const isValidUsername = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

        const currentUsername = e.target.value;
        setForm({...form, username: currentUsername});
        console.log(currentUsername);

        if (!usernameRegexp.test(currentUsername)) {
            setIsValid({...isValid, isValidUsername: false});
            setMessage({...message, formUsernameMessage: "2자 이상 5자 이하의 한글 성명을 입력해주세요."});
        } else {
            setIsValid({...isValid, isValidUsername: true});
            setMessage({...message, formUsernameMessage: "유효한 한글 성명 형식입니다."});
        }
    }, 800);

    const isValidBirth = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

        const currentBirth = e.target.value;
        setForm({...form, birth: currentBirth});
        console.log(currentBirth);

        if (!birthRegexp.test(currentBirth)) {
            setIsValid({...isValid, isValidBirth: false});
            setMessage({...message, formBirthMessage: `"yyyy-mm-dd"를 만족하는 8자의 생년월일을 입력해주세요. 중간에 "-"를 반드시 입력해주세요.`});
        } else {
            setIsValid({...isValid, isValidBirth: true});
            setMessage({...message, formBirthMessage: "유효한 생년월일 형식입니다."});
        }
    }, 800);

    const onSubmit = async () => {
        await axios
            .post('http://3.39.233.168:8080/api/user/signup', {
                email: form.email,
                password: form.password,
                username: form.username,
                birth: form.birth
            })
            .then(function (res) {
                console.log(res);
                alert("회원가입이 완료되었습니다.");
                setIsOpen(false);
                switchToSignin();
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }

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
                        <SignupHeader>회원가입</SignupHeader>
                        <ModalHeaderDiv></ModalHeaderDiv>
                    </ModalHeader>
                    <ModalForm>
                        <Logo>내집어때</Logo>
                        <ModalInput placeholder='이메일' type='email' onChange={isValidEmail}
                                    color={isValid.isValidEmail}/>
                        <ModalInputMessage
                            color={isValid.isValidEmail}>{message.formEmailMessage}</ModalInputMessage>
                        <ModalInput placeholder='비밀번호' type='password' onChange={isValidPassword}
                                    color={isValid.isValidPassword}/>
                        <ModalInputMessage
                            color={isValid.isValidPassword}>{message.formPasswordMessage}</ModalInputMessage>
                        <ModalInput placeholder='이름' type='name' onChange={isValidUsername}
                                    color={isValid.isValidUsername}/>
                        <ModalInputMessage
                            color={isValid.isValidUsername}>{message.formUsernameMessage}</ModalInputMessage>
                        <ModalInput placeholder='생년월일 8자' type='birth' onChange={isValidBirth}
                                    color={isValid.isValidBirth}/>
                        <ModalInputMessage
                            color={isValid.isValidBirth}>{message.formBirthMessage}</ModalInputMessage>
                        <ModalSubmit
                            disabled={!(isValid.isValidEmail && isValid.isValidPassword && isValid.isValidUsername && isValid.isValidBirth)}
                            onClick={onSubmit}
                        >가입 완료
                        </ModalSubmit>
                        <ModalSigninPath onClick={switchToSignin}>로그인 하기</ModalSigninPath>
                    </ModalForm>
                </ModalView>
            </ModalBackdrop>
        </ModalContainer>
    );
};

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1000;
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
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
  align-items: center;
  justify-content: space-between;
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
`;

const ModalInput = styled.input.attrs<{ color?: boolean }>({required: true})`
  display: block;
  width: 406px;
  height: 50px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  text-indent: 12px;

  &:focus {
    border: ${(props) => props.color ? '2px solid green' : '2px solid red'};
    outline: none;
  }
`;

const ModalInputMessage = styled.p<{ color?: boolean }>`
  font-size: 10px;
  height: 12px;
  margin: 6px 0;
  font-family: 'Single Day', cursive;
  width: 380px;
  color: ${(props) => props.color ? 'green' : 'red'};
  text-align: start;
`

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

const ModalSigninPath = styled.div`
  text-decoration: none;
  color: #fc335a;
  margin-top: 60px;
  cursor: pointer;
`
export default Signup;
