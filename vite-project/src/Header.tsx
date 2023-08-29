import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SearchModal from "./SearchModal";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;  // 중앙 정렬
  padding: 1.5% 2.5%;
  background-color: white;
  border-bottom: 1px solid #EBEBEB;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  align-self: center;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
  justify-content: center;
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

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: gray;
    outline: none;
  }
  
  &:focus, &:active {
    outline: none;
    border: 1px solid gray;  // 필요한 경우 테두리 색상도 지정할 수 있습니다.
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
    position: absolute;
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
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  margin: auto;
  width: 35%;

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
  flex: 0.5;  // 각 섹션의 너비를 동일하게 설정
  display: flex;
  align-items: center;
  justify-content: center;  // 내용을 섹션 중앙에 배치
  white-space: nowrap;  // 줄바꿈 방지

  &:last-child {
    border-right: none;
  }
`;

const NoBorderSearchSection = styled(SearchSection)`
  border-right: none;
`;


const SearchIconSection = styled(SearchSection)`
  flex: none;  // flex 속성 재정의
  padding: 0 5px;  // 패딩 조절
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #FF385C;
  font-size: 20px;
`;


const HostButton = styled.button`
  background: none;
  border: none;
  border-radius: 25px;  // 원통 모양으로 만들기 위한 반지름 설정
  padding: 10px 20px;  // 가로로 긴 원통 모양을 만들기 위한 패딩 설정
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;

  &:hover {
    background-color: #F7F7F7;
  }

  &:focus, &:active {
    outline: none;
    border: 1px solid gray;
  }
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    return (
        <HeaderContainer>
            <Logo onClick={() => navigate('/')}>Airbnb</Logo>
            <Navigation>
                <SearchButton onClick={() => setShowModal(true)}>
                    <SearchSection><strong>어디든지</strong></SearchSection>
                    <SearchSection><strong>언제든 일주일</strong></SearchSection>
                    <NoBorderSearchSection>게스트 추가</NoBorderSearchSection>
                    <SearchIconSection>
                        <SearchIcon icon={faSearch} />
                    </SearchIconSection>
                </SearchButton>
                <HostButton onClick={() => navigate('/Host')}>당신의 공간을 에어비앤비하세요</HostButton>
                <ProfileButton onClick={() => {
                    // 여기에 로그인 유효성 검사 로직을 추가하세요.
                    const isLoggedIn = true;
                    if (isLoggedIn) {
                        navigate('/Profile');
                    } else {
                        navigate('/Login');
                    }
                }}>
                    <HamburgerIcon icon={faBars} />
                    <UserIcon icon={faUser} />
                </ProfileButton>
            </Navigation>
            {showModal && (
                <SearchModal show={showModal} onClose={() => setShowModal(false)} />
            )}
        </HeaderContainer>
    );
};

export default Header;
