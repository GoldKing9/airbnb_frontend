import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Address } from 'react-daum-postcode';
import styled from 'styled-components';

interface Space {
  address: string;
}

interface PostCodeProps {
  space: Space;
  setSpace: React.Dispatch<React.SetStateAction<Space>>;
}

const PostCodeApi: React.FC<PostCodeProps> = (props) => {
  
  const complete = (data: Address) => {
    
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType === 'R') {
      if(data.bname !== '') {
        extraAddress += data.bname;
      }
      if(data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.setSpace({
      ...props.space,
      address: fullAddress,
    })
  }

  return (
    <>
      <ModalBox
        autoClose
        onComplete={complete}
      />
    </>
  );
};

export default PostCodeApi;

const ModalBox = styled(DaumPostcode)`
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

