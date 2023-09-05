import React, {useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import SearchModal from "./SearchModal.tsx";
import {getCookie} from '../utils/Cookies';
import Signin from "./Signin.tsx";
import Signup from "./Signup.tsx";
import Logo from './Logo';
import axios from 'axios';


const Header: React.FC = () => {
    const navigate = useNavigate();
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const closeSignupModal = () => {
        setShowSignupModal(false);
    };

    const closeSigninModal = () => {
        setShowLoginModal(false);
    };


    const switchToSignup = () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
    };

    const switchToSignin =() => {
        setShowSignupModal(false);
        setShowLoginModal(true);
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://3.39.233.168:8080/api/auth/user/logout');
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate('/')}>내집어때</Logo>
            <Navigation>
                <SearchButton onClick={() => setShowSearchModal(true)}>
                    <SearchSection><strong>어디든지</strong></SearchSection>
                    <SearchSection><strong>언제든 일주일</strong></SearchSection>
                    <NoBorderSearchSection>게스트 추가</NoBorderSearchSection>
                    <SearchIconSection>
                        <SearchIcon icon={faSearch}/>
                    </SearchIconSection>
                </SearchButton>
                <HostButton onClick={() => navigate('/Accommodation')}>당신의 공간을 에어비앤비하세요</HostButton>
                {getCookie("accessToken") ? (
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                ) : null}
                <ProfileButton onClick={() => {
                    const accessToken = getCookie("accessToken");
                    if (accessToken) {
                        navigate('/Profile');
                    } else {
                        setShowLoginModal(true);
                    }
                }}>
                    <HamburgerIcon icon={faBars}/>
                    <UserIcon icon={faUser}/>
                </ProfileButton>
            </Navigation>
            {showSearchModal && (
                <SearchModal isOpen={showSearchModal} setIsOpen={setShowSearchModal}/>
            )}
            {showLoginModal && <Signin switchToSignup={switchToSignup} setIsOpen={closeSigninModal}/>}
            {showSignupModal && <Signup switchToSignin={switchToSignin} setIsOpen={closeSignupModal}/>}
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2.5%;
  background-color: white;
  border-bottom: 1px solid #EBEBEB;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const HamburgerIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: #222222;
  position: relative;

  &::before,
  &::after {
    content: '';
    background-color: black;
    height: 2px;
    width: 20px;
    position: fixed;
    left: 0;
  }

  &::before {
    top: -6px;
  }

  &::after {
    bottom: -6px;
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-left: 5px;
  color: #717171;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px 15px;
  border: 1px solid #DDDDDD;
  border-radius: 25px;
  background-color: transparent;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  margin: auto;
  width: 35%;
  font-size: 20px;

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-width: 2000px) {
    font-size: 19px;  // 2000px 이하일 때의 폰트 크기
  }

  @media (max-width: 1700px) {
    font-size: 18px;  // 1700px 이하일 때의 폰트 크기
  }

  @media (max-width: 1400px) {
    font-size: 17px;  // 1400px 이하일 때의 폰트 크기
  }

  @media (max-width: 1080px) {
    font-size: 16px;  // 1080px 이하일 때의 폰트 크기
  }

  @media (max-width: 670px) {
    font-size: 15px;  // 670px 이하일 때의 폰트 크기
  }

  &:hover {
    border-color: #DDDDDD;
    outline: none;
  }

  &:focus, &:active {
    outline: none;
    border: 1px solid gray;
  }
`;

const SearchSection = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:last-child {
    border-right: none;
  }
`;

const NoBorderSearchSection = styled(SearchSection)`
  border-right: none;
`;


const SearchIconSection = styled(SearchSection)`
  flex: none; // flex 속성 재정의
  padding: 0 5px; // 패딩 조절
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #FF385C;
  font-size: 20px;
`;

const HostButton = styled.button`
  background: none;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 20px;

  @media (max-width: 480px) {
    width: 90%;
    text-align: center;
  }


  @media (max-width: 2000px) {
    font-size: 19px;  // 2000px 이하일 때의 폰트 크기
  }

  @media (max-width: 1700px) {
    font-size: 18px;  // 1700px 이하일 때의 폰트 크기
  }

  @media (max-width: 1400px) {
    font-size: 17px;  // 1400px 이하일 때의 폰트 크기
  }

  @media (max-width: 1080px) {
    font-size: 16px;  // 1080px 이하일 때의 폰트 크기
  }

  @media (max-width: 670px) {
    font-size: 15px;  // 670px 이하일 때의 폰트 크기
  }

  &:hover {
    color: #999999;
  }

  &:focus, &:active {
    outline: none;
    border: 1px solid gray;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  border: 1px solid gray;
  border-radius: 25px;
  background-color: transparent;
  cursor: pointer;
  transition: box-shadow 0.3s;
  outline: none;
  
  @media (max-width: 480px) {
    width: 30%;
    justify-content: center;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: gray;
    outline: none;
  }

  &:focus, &:active {
    outline: none;
    border: 1px solid gray;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;

  @media (max-width: 480px) {
    width: 50%;
    text-align: center;
  }
  
  &:hover {
    background-color: #F7F7F7;
  }

  &:focus, &:active {
    outline: none;
    border: 1px solid gray;
  }
`;

export default Header;
