import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

const Navigation = styled.div`
    display: flex;
    gap: 20px;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Logo>Airbnb</Logo>
            <Navigation>
                <span>Host a home</span>
                <span>Host an experience</span>
                <span>Help</span>
            </Navigation>
        </HeaderContainer>
    );
};

export default Header;
