import React from 'react';
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',  // 뷰포트의 너비로 설정
    height: '100vh', // 뷰포트의 높이로 설정
    justifyContent: 'space-between' // 중간의 내용 영역과 Footer 사이에 공간을 최대로
});

const App: React.FC = () => {

    return (
        <Container>
            <Header />
            <h1>Show component</h1>
            <Footer></Footer>
        </Container>
    );
};

export default App;
