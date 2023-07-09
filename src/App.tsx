import React from 'react';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agreement from './pages/login/Agreement';
import Main from './pages/main/Main';
import { Provider } from 'mobx-react';
import RootStore from './store/RootStore';
import KakaoAuth from './pages/login/KakaoAuth';
import Friend from "./pages/friend/Friend";
import Mind from './pages/mind/Mind';
import Detail from "./pages/detail/Detail";
import DatePickerWrap from "./components/common/DatePickerWrap";

function App() {
    return (
    <Provider RootStore={RootStore}>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/page/signup" element={<Signup />}></Route>
                    <Route path="/page/agreement" element={<Agreement />}></Route>
                    <Route path="/page/main" element={<Main />}></Route>
                    <Route path="/page/friend" element={<Friend />}></Route>
                    <Route path="/page/auth/kakao" element={<KakaoAuth/>}></Route>
                    <Route path="/page/relationship" element={<Mind />}></Route>
                    <Route path="/page/detail" element={<Detail />}></Route>

                    <Route path="/page/date" element={<DatePickerWrap />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    </Provider>
    );
}

export default App;
