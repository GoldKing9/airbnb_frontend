import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
                        <h4>{accommodation.mainAddress}</h4>
                        <p>Price: ₩{accommodation.price}</p>
                        <p>Average Rating: {accommodation.ratingAvg}</p>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4개의 열 생성
  gap: 16px; // 각 항목 사이의 간격
  padding: 16px;
  overflow-y: auto; // 세로 스크롤 활성화
  max-height: 100vh; // 뷰포트 높이를 최대로 설정
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 8px;
  padding: 16px;
  text-align: start;
`;

const Image = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;


export default Show;
