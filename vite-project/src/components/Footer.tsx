import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Info>© 2023 내집어때, Inc. All rights reserved</Info>
            <div>
                <span>Privacy</span> · <span>Terms</span> · <span>Sitemap</span>
            </div>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
  width: 100%; // 너비를 100%로 설정
  border-top: 1px solid #EBEBEB;
`;

const Info = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
  color: #222222;
`;

export default Footer;
