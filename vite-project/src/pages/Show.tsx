import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type Accommodation = {
    accommodationId: number;
    mainAddress: string;
    price: number;
    ratingAvg: number;
    images: { acmdImageUrl: string | null }[];
};

const Show: React.FC = () => {
    const [results, setResults] = useState<Accommodation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://3.39.233.168:8080/api/accommodation/search');
                setResults(response.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container>
                {results.map(accommodation => (
                    <Card key={accommodation.accommodationId}>
                        {accommodation.images[0]?.acmdImageUrl && (
                            <Image src={accommodation.images[0].acmdImageUrl} alt="Accommodation" />
                        )}
                        <CardH4>{accommodation.mainAddress}</CardH4>
                        <CardP>₩ {accommodation.price} /박</CardP>
                        <CardP>
                            <FontAwesomeIcon icon={faStar} /> {accommodation.ratingAvg}</CardP>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  height: calc(100vh - 180px);
  overflow: auto;
  margin-bottom: 80px;
`;

const Card = styled.div`
  border-radius: 8px;
  margin: 8px;
  padding: 16px;
  text-align: start;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const CardH4 = styled.h4`
  margin: 8px 0;
`;

const CardP = styled.p`
  margin: 8px 0;
`;

export default Show;
