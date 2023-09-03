import './App.css'
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';
import Show from "./pages/Show.tsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AccommodationDetail from "./pages/AccommodationDetail";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components";

function Layout () {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer></Footer>
        </Container>
    );
}

function App() {
    return (
        <>
            <GlobalStyle/>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Show/>}/>
                        <Route path="accommodation/:id" element={<AccommodationDetail/>}></Route>
                    </Route>
                </Routes>

            </Router>
        </>
    )
}

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',  // 뷰포트의 너비로 설정
    height: '100vh', // 뷰포트의 높이로 설정
    justifyContent: 'space-between' // 중간의 내용 영역과 Footer 사이에 공간을 최대로
});


export default App
