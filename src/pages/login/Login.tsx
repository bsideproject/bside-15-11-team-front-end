import React, { useEffect } from "react";
import KakaoBtn from '../../assets/images/buttons/KaKao Button.png';
import AppleBtn from '../../assets/images/buttons/Apple Button.png';
import RootStore from "../../store/RootStore";


function Login(){

    useEffect(() => {
        RootStore.kakaoStore.initKakao();
    }, []);

    const handleLogin = async() => {
        await RootStore.kakaoStore.requestAuthCode();
    }

    return(
        <div className="Login">
            <div className="button-container">
                <img src={KakaoBtn} alt='카카오 로그인' onClick={handleLogin}/>
            </div>
            <div className="login-btn-div">
                <button className="button-container">
                    <img src={AppleBtn} alt='애플 로그인'/>
                </button>
            </div>
        </div>
    )
};

export default Login;