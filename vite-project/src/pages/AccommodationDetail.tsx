import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

type AccommodationDetail = {
    images: { acmdImageUrl: string }[];
    username: string;
    guest: number;
    bedroom: number;
    bed: number;
    bathroom: number;
    userDescription: string;
};

const AccommodationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
            <ImageContainer>
                {detail.images.map((image, index) => (
                    <StyledImage key={index} src={image.acmdImageUrl} alt={`Accommodation Image ${index}`}/>
                ))}
            </ImageContainer>
            <DetailSection>
                <Title>{detail.username} 님이 호스팅하는 부티크 호텔의 객실</Title>
                <Subtitle>
                    최대 인원 {detail.guest}명 · 침실 {detail.bedroom}개 · 침대 {detail.bed}개 · 욕실 {detail.bathroom}개
                </Subtitle>
                <Description>{detail.userDescription}</Description>
                <ReviewButton onClick={() => navigate('/Review')}>리뷰 보기</ReviewButton>
            </DetailSection>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const StyledImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const DetailSection = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-top: 10px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-top: 20px;
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
