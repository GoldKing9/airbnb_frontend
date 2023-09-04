import styled from 'styled-components';

const Logo = styled.h1`
  text-align: center;
  font-family: 'Single Day', cursive;
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #fc335a;
  color: white;
  border-radius: 20px 100px 20px 100px;
  margin-bottom: 40px;
  
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    width: 40%;
    margin-bottom: 20px;
    justify-content: center;
  }
`;

export default Logo;
