import { useState } from 'react';
import styled from 'styled-components';
import PostCodeApi from '../utils/PostCodeApi';

interface Space {
  address: string;
}

interface AcmdInfo {
  acmdName: string;
  acmdDescription: string;
}

interface AddressHostInfoProps {
  space: Space;
  setSpace: React.Dispatch<React.SetStateAction<Space>>;
  detailAddress: string;
  setDetailAddress: React.Dispatch<React.SetStateAction<string>>;
}

interface AcmdInfoProps {
  acmdInfo: AcmdInfo;
  setAcmdInfo: React.Dispatch<React.SetStateAction<AcmdInfo>>;
}

interface AccommodationData extends AddressHostInfoProps, AcmdInfoProps {}

const AddressHostInfo: React.FC<AccommodationData> = ({ space, setSpace, detailAddress, setDetailAddress, acmdInfo, setAcmdInfo }) => {
  
  const [popup, setPopup] = useState<boolean>(false);

  const handleMainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSpace({
      ...space, [e.target.name]: e.target.value,
    });
  }

  const handleDetailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    e.preventDefault();
    setDetailAddress(currentInput);
  }

  const handleComplete = () => {
    setPopup(!popup);
  }

  const handleAcmdName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAcmdInfo({...acmdInfo, acmdName: e.target.value});
  }

  const handleAcmdDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setAcmdInfo({...acmdInfo, acmdDescription: e.target.value});
  }

  return (
    <>
      <AddressH2>주소 등록</AddressH2>
      <AddressMain 
        placeholder='주소' 
        type='text' 
        required={true} 
        name='address' 
        onChange={handleMainInput}
        value={space.address}
        onClick={handleComplete}
      />
      <AddressDetail
        placeholder='세부 주소 (건물, 동, 호)'
        type='text'
        required={true}
        name='detailAddress'
        onChange={handleDetailInput}
        value={detailAddress}
      />
      <AddressButton onClick={handleComplete}>주소 찾기</AddressButton>
      {popup && <PostCodeApi space={space} setSpace={setSpace}></PostCodeApi>}

      <AcmdInfoH2>숙소 설명</AcmdInfoH2>
      <AcmdNameInput
        placeholder='숙소 제목'
        type='text'
        required={true}
        name='acmdName'
        onChange={handleAcmdName}
        value={acmdInfo.acmdName}
      />
      <AcmdDescriptionTextera
        placeholder='숙소 소개글(1000자 이내로 작성)'
        required={true}
        name='acmdDescription'
        onChange={handleAcmdDescription}
        value={acmdInfo.acmdDescription}
        rows={5}
        maxLength={1000}
      />
    </>
  );
};

export default AddressHostInfo;

const AddressMain = styled.input`
  width: 350px;
  height: 30px;
  border-radius: 10px;
  border: 1px #ebebeb solid;
  text-indent: 12px;
  margin-left: 50px;
`

const AddressDetail = styled(AddressMain)`
  margin-top: 10px;
`;

const AddressH2 = styled.h2`
  width: 60px;
  height:30px;
  font-size: 16px;
  margin-left: 55px;
  margin-top: 25px;
`

const AddressButton = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 15px;
  background-color: #fc335a;
  color: white;
  margin: 15px 0 0 330px;
  border: none;
  font-weight: bolder;
  cursor: pointer;
`

const AcmdInfoH2 = styled(AddressH2)``;

const AcmdNameInput = styled.input`
  width: 350px;
  height: 30px;
  border-radius: 10px;
  border: 1px #ebebeb solid;
  text-indent: 12px;
  margin-left: 50px;
`

const AcmdDescriptionTextera = styled.textarea`
  width: 350px;
  height: 200px;
  border-radius: 10px;
  border: 1px #ebebeb solid;
  text-indent: 12px;
  margin-left: 50px;
  margin-top: 10px;
  padding-top: 12px;
`