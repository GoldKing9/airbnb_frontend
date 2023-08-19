import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    padding: 20px;
    background-color: #f7f7f7;
`;

const Info = styled.div`
    font-size: 14px;
    margin-bottom: 10px;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <Info>© 2021 Airbnb, Inc. All rights reserved</Info>
            <div>
                <span>Privacy</span> · <span>Terms</span> · <span>Sitemap</span>
            </div>
        </FooterContainer>
    );
};

export default Footer;
