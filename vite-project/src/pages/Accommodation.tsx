import React from 'react';
import styled from 'styled-components';
import AddressHostInfo from '../components/AddressHostInfo';
import ImageInfo from '../components/ImageInfo';
import AccommodationOption from '../components/AccommodationOption';
import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { getCookie } from '../utils/Cookies';
import { useNavigate } from 'react-router-dom';

interface AcmdInfo {
  acmdName: string;
  acmdDescription: string; 
}

interface Space {
  address: string;
}

interface AcmdOptions {
  price: number,
  guest: number,
  bedroom: number,
  bed: number,
  bathroom: number,
}

const Accommodation = () => {
  
  const [showImages, setShowImages] = useState<File[]>([]);
  
    const [space, setSpace] = useState<Space>({
    address: '',
  });

  const [detailAddress, setDetailAddress] = useState<string>("");

  const [acmdInfo, setAcmdInfo] = useState<AcmdInfo>({
    acmdName: "",
    acmdDescription: ""
  });

  const [options, setOptions] = useState<AcmdOptions>({
    price: 0,
    guest: 0,
    bedroom: 0,
    bed: 0,
    bathroom: 0
  })

  const navigate = useNavigate();

  const handleSubmit = async () => {
  
    const formData = new FormData();

    const requestObject = {
      mainAddress: space.address,
      detailAddress: detailAddress,
      acmdName: acmdInfo.acmdName,
      acmdDescription: acmdInfo.acmdDescription,
      price: options.price.toString(),
      guest: options.guest.toString(),
      bedroom: options.bedroom.toString(),
      bed: options.bed.toString(),
      bathroom: options.bathroom.toString()
    };

    const jsonData = JSON.stringify(requestObject);

    formData.append('request', new Blob([jsonData], { type: 'application/json' }));

    showImages.forEach((imageUrl) => {
      formData.append('images', imageUrl);
    });

    const accessToken: string | undefined = getCookie('accessToken');

    if(!accessToken) {
      console.error("access 토큰이 쿠키내에 존재하지 않습니다.");
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'multipart/form-data',
      }
    }

    await axios.post(
      'http://3.39.233.168:8080/api/auth/accommodation',
      formData,
      config
    ).then((res) => {
      console.log(res);
      alert("숙소가 정상적으로 등록되었습니다.")
      navigate('/Profile');
    }).catch((error)=> {
      console.error(error);
    })
  }

  return (
    <AccommodationContainer>
      <AccommodationHeader>
        <AccommodationH1>숙박 등록</AccommodationH1>
        <AccommodationButton onClick={handleSubmit}>등록 하기</AccommodationButton>
      </AccommodationHeader>
      <AccommodationDiv>
        <TitleAddressDiv>
          <AddressHostInfo 
            space={space} 
            setSpace={setSpace} 
            detailAddress={detailAddress} 
            setDetailAddress={setDetailAddress} 
            acmdInfo={acmdInfo}
            setAcmdInfo={setAcmdInfo}
          />
        </TitleAddressDiv>
        <ImageDiv>
          <ImageInfo 
            showImages={showImages} 
            setShowImages={setShowImages} 
          />
        </ImageDiv>
        <InfoPriceDiv>
          <AccommodationOption
            options={options}
            setOptions={setOptions}
          />
        </InfoPriceDiv>
      </AccommodationDiv>
    </AccommodationContainer>
  );
};

export default Accommodation;

const AccommodationContainer = styled.div`
  width: 100%;
  height: calc(100vh - 180px);
  padding: 0;
`

const AccommodationHeader = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
`

const AccommodationH1 = styled.h1`
  width: 120px;
  height: 40px;
  margin-right: auto;
  font-size: 20px;
  line-height: 42px;
`

const AccommodationButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  background-color: #fc335a;
  color: white;
  pointer: cursor;
  margin: 0 20px 0 auto;
  font-size: 16px;
  border-radius: 15px;
  margin-left: auto;
  cursor: pointer;
`

const AccommodationDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const Accommodationsector = styled.div`
  width: calc(100% / 3);
  height: 550px;
  border: 1px #ebebeb solid;
`

const TitleAddressDiv = styled(Accommodationsector)`
  display: flex;
  flex-direction: column;
`
const ImageDiv = styled(Accommodationsector)`  
`
const InfoPriceDiv = styled(Accommodationsector)`
  
`