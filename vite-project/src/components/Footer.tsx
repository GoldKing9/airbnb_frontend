import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Info>© 2023 내집어때, Inc. All rights reserved</Info>
            <FooterH3>
                <span>Privacy</span> · <span>Terms</span> · <span>Sitemap</span>
            </FooterH3>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid #EBEBEB;
`;

const Info = styled.div`
  font-size: 14px;
  color: #222222;
  margin-top: 10px;
`;

const FooterH3 = styled.h3`
  margin: 10px;
`;

export default Footer;
