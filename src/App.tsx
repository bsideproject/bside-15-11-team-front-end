import React from 'react';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Agreement from './pages/login/Agreement';

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/agreement" element={<Agreement />}></Route>
            </Routes>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
            <Link to="/agreement">약관 동의</Link>
        </BrowserRouter>
        <ProtoTest />
    </div>
    );
}

export default App;
