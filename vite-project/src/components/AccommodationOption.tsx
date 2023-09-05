import React from 'react';
import styled from 'styled-components';

interface AcmdOptions {
  price: number,
  guest: number,
  bedroom: number
  bed: number,
  bathroom: number
}

interface AccommodationOptionProps {
  options: AcmdOptions;
  setOptions: React.Dispatch<React.SetStateAction<AcmdOptions>> 
}

const AccommodationOption: React.FC<AccommodationOptionProps> = ({options, setOptions}) => {

  const handlePrice = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOptions({...options, price: Number(e.target.value)});
  }

  const handleGuest = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOptions({...options, guest: Number(e.target.value)});
  }

  const handleBedroom = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOptions({...options, bedroom: Number(e.target.value)});
  }

  const handleBed = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOptions({...options, bed: Number(e.target.value)});
  }

  const handleBathroom = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOptions({...options, bathroom: Number(e.target.value)});
  }

  return (
    <>
      <OptionH2>숙박 옵션 및 요금 설정</OptionH2>
      <OptionDiv>
        <PriceDiv>
          <PriceTitle>요금</PriceTitle>
          <PriceInput 
            onChange={handlePrice}
            name='price' 
            type='text'
            required={true}
            value={options.price.toString()}
          />
          <PriceInputDiv>원</PriceInputDiv>
        </PriceDiv>
        <GuestDiv>
          <GuestTitle>사용 인원</GuestTitle>
          <GuestInput 
            onChange={handleGuest} 
            name='guest' 
            type='text'
            required={true}
            value={options.guest.toString()}
          />
          <GuestInputDiv>명</GuestInputDiv>
        </GuestDiv>
        <BedroomDiv>
          <BedroomTitle>침실 수</BedroomTitle>
          <BedroomInput 
            onChange={handleBedroom}
            name='bedroom' 
            type='text'
            required={true}
            value={options.bedroom.toString()}
          />
          <BedroomInputDiv>개</BedroomInputDiv>
        </BedroomDiv>
        <BedDiv>
          <BedTitle>침대 수</BedTitle>
          <BedInput 
            onChange={handleBed}
            name='bed' 
            type='text'
            required={true}
            value={options.bed.toString()}
          />
          <BedInputDiv>개</BedInputDiv>
        </BedDiv>
        <BathroomDiv>
          <BathroomTitle>욕실 수</BathroomTitle>
          <BathroomInput 
            onChange={handleBathroom}
            name='bathroom' 
            type='text'
            required={true}
            value={options.bathroom.toString()}
          />
          <BathroomInputDiv>개</BathroomInputDiv>
        </BathroomDiv>
      </OptionDiv>
    </>
  );
};

export default AccommodationOption;

const OptionH2 = styled.h2`
  width: 200px;
  height:30px;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 25px;
`

const OptionDiv = styled.div`
  width: 420px;
  height: 450px;
  border: 1px #ebebeb solid;
  margin: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OptionDetailDiv = styled.div`
  width: 360px;
  height: 90px;
  border-bottom: 1px #ebebeb solid;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
`
const PriceDiv = styled(OptionDetailDiv)``;

const BedDiv = styled(OptionDetailDiv)``;

const BedroomDiv = styled(OptionDetailDiv)``;

const BathroomDiv = styled.div`
  width: 360px;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GuestDiv = styled(OptionDetailDiv)``;

const OptionTitle = styled.div`
  width: 100px;
  height: 14px;
  font-size: 14px;
  margin-right: auto;
  font-weight: bolder;
`
const PriceTitle = styled(OptionTitle)``;

const GuestTitle = styled(OptionTitle)``;

const BedroomTitle = styled(OptionTitle)``;

const BedTitle = styled(OptionTitle)``;

const BathroomTitle = styled(OptionTitle)``;

const PriceInput = styled.input`
  width: 55px;
  height: 20px;
  border-radius: 3px;
  border: 1px #ebebeb solid;
  margin-right: 5px;
  text-indent: 2px;
`

const OptionInputDiv = styled.div`
  width: 16px;
  height: 16px;
  margin-left: 0;
  font-size: 14px;
  font-weight: bolder;
`
const PriceInputDiv = styled(OptionInputDiv)``;

const GuestInputDiv = styled(OptionInputDiv)``;

const BedroomInputDiv = styled(OptionInputDiv)``;

const BedInputDiv = styled(OptionInputDiv)``;

const BathroomInputDiv = styled(OptionInputDiv)``;

const OptionInput = styled.input`
  width: 20px;
  height: 20px;
  border: 1px #ebebeb solid;
  font-size: 14px;
  margin-right: 5px;
  text-indent: 2px;
  border-radius: 3px;
  text-indent: 4px;
`
const GuestInput = styled(OptionInput)`
`;

const BedroomInput = styled(OptionInput)`

`;

const BedInput = styled(OptionInput)`

`;

const BathroomInput = styled(OptionInput)`

`;