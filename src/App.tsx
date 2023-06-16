import React from 'react';
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agreement from './pages/login/Agreement';
import Main from './pages/main/Main';
import { Provider } from 'mobx-react';
import RootStore from './store/RootStore';
import Auth from './pages/login/Auth';
import Friend from "./pages/friend/Friend";
import Design from "./pages/design";

function App() {
    return (
    <Provider RootStore={RootStore}>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/agreement" element={<Agreement />}></Route>
                    <Route path="/main" element={<Main />}></Route>
                    <Route path="/friend" element={<Friend />}></Route>
                    <Route path="/auth" element={<Auth/>}></Route>


                    <Route path="/design" element={<Design />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    </Provider>
    );
}

export default App;
