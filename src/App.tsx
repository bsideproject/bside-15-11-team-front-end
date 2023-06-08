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
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/agreement" element={<Agreement />}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
}

export default App;
