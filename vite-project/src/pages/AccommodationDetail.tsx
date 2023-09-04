import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faStar,
    faMedal,
    faKey,
    faCar,
    faWifi,
    faTv,
    faWind,
    faSuitcase,
    faDoorClosed,
    faBell,
    faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons';

type AccommodationDetail = {
    images: { acmdImageUrl: string }[];
    username: string;
    guest: number;
    bedroom: number;
    bed: number;
    bathroom: number;
    userDescription: string;
    mainAddress: string;
    detailAddress: string;
    ratingAvg: number;
    reviewCnt: number;
};

const AccommodationDetail: React.FC = () => {
    const {id} = useParams();
    const [detail, setDetail] = useState<AccommodationDetail | null>(null);

    useEffect(() => {
        axios.get(`http://3.39.233.168:8080/api/accommodation/${id}`)
            .then(response => {
                setDetail(response.data);
            })
            .catch(error => {
                console.error("Error fetching accommodation detail:", error);
            });
    }, [id]);

    if (!detail) return <div>Loading...</div>;

    return (
        <Container>
            <AddressSection>
                <Address>{detail.mainAddress} {detail.detailAddress}</Address>
            </AddressSection>
            <RatingSection>
                <FontAwesomeIcon icon={faStar}/> {detail.ratingAvg} · 후기 {detail.reviewCnt}개
            </RatingSection>
            <ImageContainer>
                {detail.images.map((image, index) => (
                    <StyledImage key={index} src={image.acmdImageUrl} alt={`Accommodation Image ${index}`}/>
                ))}
            </ImageContainer>
            <DetailSection>
                <Title>{detail.username} 님이 호스팅하는 부티크 호텔의 객실</Title>
                <Description>{detail.userDescription}</Description>
                <Subtitle>
                    최대 인원 {detail.guest}명 · 침실 {detail.bedroom}개 · 침대 {detail.bed}개 · 욕실 {detail.bathroom}개
                </Subtitle>
                <SuperHostSection>
                    <FontAwesomeIcon icon={faMedal}/>
                    <div>
                        <p>Jimi Stay님은 슈퍼호스트입니다</p>
                        <p>슈퍼호스트는 풍부한 경험과 높은 평점을 자랑하며 게스트가 숙소에서 편안히 머무를 수 있도록 최선을 다하는 호스트입니다.</p>
                    </div>
                </SuperHostSection>
                <CheckInSection>
                    <FontAwesomeIcon icon={faKey}/>
                    <div>
                        <p>순조로운 체크인 과정</p>
                        <p>최근 숙박한 게스트 중 95%가 체크인 과정에 별점 5점을 준 숙소입니다.</p>
                    </div>
                </CheckInSection>
                <ParkingSection>
                    <FontAwesomeIcon icon={faCar}/>
                    <div>
                        <p>무료 주차 혜택을 누리세요</p>
                        <p>해당 지역에서 무료 주차가 가능한 몇 안 되는 숙소 중 하나입니다.</p>
                    </div>
                </ParkingSection>
                <FacilitiesSection>
                    <FacilitiesTitle>숙소 편의시설</FacilitiesTitle>
                    <Facility>
                        <FontAwesomeIcon icon={faUmbrellaBeach}/> 해변과 인접 - 해변
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faWifi}/> 무선 인터넷
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faCar}/> 건물 내 무료 주차
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faTv}/> TV
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faWind}/> 에어컨
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faSuitcase}/> 여행 가방 보관 가능
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faDoorClosed}/> 냉장고
                    </Facility>
                    <Facility>
                        <FontAwesomeIcon icon={faBell}/> 일산화탄소 경보기
                    </Facility>
                </FacilitiesSection>

                {/*
                <ReviewButton onClick={() => navigate('/Review')}>리뷰 보기</ReviewButton>
*/}
            </DetailSection>
        </Container>
    );
};

const Container = styled.div`
  padding: 0 20em 0 20em;
  height: calc(100vh - 180px);
  max-width: 1200px;
  margin: 0 auto;
  overflow: auto;
`;

const AddressSection = styled.div`
  text-align: start;
  padding-top: 1em;
`;

const Address = styled.h1`
  font-weight: bold;
  margin: 0.25em 0 0.25em 0;
`;

const RatingSection = styled.h3`
  color: #000000;
  margin: 0.5em 0 0.5em 0;
  text-align: start;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  border-radius: 8px;
`;

const DetailSection = styled.div`
  margin-top: 20px;
  text-align: start;
  font-size: 20px;
  border-bottom: 1px solid #ccc;

  @media (max-width: 2000px) {
    font-size: 18px;
  }

  @media (max-width: 1700px) {
    font-size: 17px;
  }

  @media (max-width: 1400px) {
    font-size: 16px;
  }

  @media (max-width: 1080px) {
    font-size: 15px;
  }

  @media (max-width: 670px) {
    font-size: 14px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

const Description = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const InfoSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const SuperHostSection = styled(InfoSection)`
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    margin: 0;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const CheckInSection = styled(InfoSection)`
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    margin: 0;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const ParkingSection = styled(InfoSection)`

  padding-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    margin: 0;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const FacilitiesSection = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 10px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

`;

const FacilitiesTitle = styled.h3`
  font-weight: bold;
  grid-column: span 2;
`;

const Facility = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


const ReviewButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #FF385C;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF5C7D;
  }
`;

export default AccommodationDetail;
