// import { useState } from 'react';
import React from 'react';
import styled from 'styled-components';
import ToggleHandler from '../utils/ToggleHandler';
import StarRating from '../utils/StarRating';
import Host from '../components/Host';

const Profile = () => {
  
  // const [toggleHostMode, setToggleHostMode] = useState<boolean>(false);
  
  
  return (
    <Container>
      <ProfileContainer>
        <PhotoContainer>
          <PhotoDiv></PhotoDiv>
          <UsernameDiv>김형준</UsernameDiv>
        </PhotoContainer>
        <ContentsContainer>
          <ToggleHandler/>
          <ThemeReview>Hosting 평점 & 리뷰들</ThemeReview>
          <StarRating/>
          <ThemeHostDescription>Host 소개</ThemeHostDescription>
          <UserDescriptionDiv/>
          <ButtonDiv>
            <FixButton>수정</FixButton>
            <FinishButton>완료</FinishButton>
          </ButtonDiv>
        </ContentsContainer>
      </ProfileContainer>
      <Host/>
    </Container>  
  );

  
};

export default Profile;

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 180px);
  display: flex;
  overflow: auto;
  padding-top: 30px;
`

const ProfileContainer = styled.nav`
  width: 25%;
  height: 630px;
  display: flex;
  flex-direction: column;
  padding: 0 10px 0 10px;
`

const PhotoContainer = styled.div`
  height: 40%;
  border: 1px rgba(0, 0, 0, 0.04) solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
  margin-top: 5px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`
const ContentsContainer = styled.div`
  height: 55%;
  border: 1px rgba(0, 0, 0, 0.04) solid;
  margin-top: 20px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
`

// const UserContainer = styled.div`
//   width: 70%;
//   height: 630px;
//   border: 1px black solid;
// `

const PhotoDiv = styled.div`
  border: 1px #ebebeb solid;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-top: 10px;
`

const UsernameDiv = styled.div`
  width: 100px;
  height: 50px;
  font-size: 20px;
  margin-top: 20px;
  font-weight: bolder;
`
const ThemeReview = styled.h4`
  margin-top: 2px;
  height: 30px;
  margin-bottom: 0;
`

const ThemeHostDescription = styled.h4`
  margin-top: 20px;
  margin-bottom: 10px;
`

const UserDescriptionDiv = styled.div`
  width: 250px;
  height: 110px;
  border-radius: 30px;
  border: 1px #ebebeb solid;
  margin-top: 5px;
`

const ButtonDiv = styled.div`
  width: 200px;
  height: 40px;
  border: none;
  margin-top: 10px
  display: flex;
  flex-direction: row;
`

const FixButton = styled.button`
  width: 40px;
  height: 20px;
  border-radius: 20px;
  margin-right: 20px; 
  margin-top: 15px;
  background-color: #fc335a;
  border: none;
  color: white;
`
const FinishButton = styled(FixButton)`

`

