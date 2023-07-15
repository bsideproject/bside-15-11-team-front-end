import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import { Provider } from 'mobx-react';
import RootStore from './store/RootStore';
import Friend from "./pages/friend/Friend";
import Mind from './pages/mind/Mind';
import Detail from "./pages/detail/Detail";

function App() {

    const [isMessageReceived, setMessageReceived] = useState<boolean>(false);

    useEffect(() => {

        const handleMessage = (event : any) => {
            if(!isMessageReceived) {

                setMessageReceived(true);
                window.removeEventListener('message', handleMessage);

                const data = JSON.parse(event.data);

                RootStore.userStore.setJwtKey(data.jwtKey);
                RootStore.userStore.setServiceUserId(data.userData.sequence);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        }

    }, [isMessageReceived]);      

    return (
    <Provider RootStore={RootStore}>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/page/main' element={<Main />}></Route>
                    <Route path="/page/friend" element={<Friend />}></Route>
                    <Route path="/page/relationship" element={<Mind />}></Route>
                    <Route path="/page/detail" element={<Detail />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    </Provider>
    );
}

export default App;
