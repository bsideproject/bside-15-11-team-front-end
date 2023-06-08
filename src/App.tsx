import React from 'react';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtoTest from './ProtoTest';

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
        </BrowserRouter>
    </div>
    );
}

export default App;
