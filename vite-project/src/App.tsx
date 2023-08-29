import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Show from "./Show";
import GlobalStyle from "./GlobalStyle";

function App() {

    return (
        <>
            <GlobalStyle/>
            <Router>
                <Routes>
                    <Route path="/" element={<Show/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
