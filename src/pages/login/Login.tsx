import React, { useEffect } from "react";
import KakaoBtn from '../../assets/images/buttons/KaKao Button.png';
import AppleBtn from '../../assets/images/buttons/Apple Button.png';
import RootStore from "../../store/RootStore";


function Login(){

    const apple_login_service_id : string = process.env.REACT_APP_APPLE_LOGIN_CLIENT_ID as string;
    const apple_redirect_url : string = process.env.REACT_APP_APPLE_REDIRECT_URI as string;

    useEffect(() => {
        RootStore.kakaoStore.initKakao();
    }, []);

    const handleKakaoLogin = async() => {
        await RootStore.kakaoStore.requestAuthCode();
    }

    const handleAppleLogin = async() => {
        const config = {
            client_id: apple_login_service_id,
            redirect_uri: apple_redirect_url,
            response_type: "code",
            state: "origin:web",
            response_mode: "query",
            m: 11,
            v: "1.5.4"
        };
        const queryString : string = Object.entries(config).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');

        window.location.href = `https://appleid.apple.com/auth/authorize?${queryString}`;
    }

    return(
        <div className="Login">
            <div className="button-container">
                <img src={KakaoBtn} alt='카카오 로그인' onClick={handleKakaoLogin}/>
            </div>
            <div className="button-container">
                <img src={AppleBtn} alt='애플 로그인' onClick={handleAppleLogin}/>
            </div>
        </div>
    )
};

export default Login;