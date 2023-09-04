import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useNavigate} from 'react-router-dom';

type Accommodation = {
    accommodationId: number;
    mainAddress: string;
    price: number;
    ratingAvg: number;
    images: { acmdImageUrl: string | undefined }[];
};

const Show: React.FC = () => {
    const [results, setResults] = useState<Accommodation[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://3.39.233.168:8080/api/accommodation/search')
            .then(response => {
                setResults(response.data.results);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const handleCardClick = async (accommodationId: number) => {
        try {
            navigate(`/accommodation/${accommodationId}`);
        } catch (error) {
            console.error("Error fetching accommodation detail:", error);
        }
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const preventNavigation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Container>
            {results.map((accommodation) => (
                <Card key={accommodation.accommodationId}
                      onClick={() => handleCardClick(accommodation.accommodationId)}>
                    {accommodation.images.length > 0 && (
                        <StyledSlider {...sliderSettings}>
                            {accommodation.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image.acmdImageUrl}
                                    alt={`Accommodation ${index}`}
                                    onClick={preventNavigation}
                                />
                            ))}
                        </StyledSlider>
                    )}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginLeft: 16
                        }}
                    >
                        <CardH4>{accommodation.mainAddress}</CardH4>
                        <CardP>₩ {accommodation.price} /박</CardP>
                        <CardP>
                            <FontAwesomeIcon icon={faStar}/> {accommodation.ratingAvg}
                        </CardP>
                    </div>
                </Card>
            ))}
        </Container>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  height: calc(100vh - 180px);
  overflow: auto;
  margin-bottom: 80px;
  padding: 0 5em 0 5em;

  @media (max-width: 2000px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1700px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin: 8px;
  padding: 16px;
  text-align: start;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: gray;
    outline: none;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%; // 이미지의 최대 너비를 100%로 설정
  height: 250px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const StyledSlider = styled(Slider)`
  width: 240px;
  height: 250px;
  margin-bottom: 32px;
  overflow: visible;

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    width: 180px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const CardH4 = styled.h4`
  margin: 8px 0;
`;

const CardP = styled.p`
  margin: 8px 0;
`;

export default Show;
