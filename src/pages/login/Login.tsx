import React, { useEffect } from "react";
import KakaoBtn from '../../assets/images/buttons/KaKao Button.png';
import AppleBtn from '../../assets/images/buttons/Apple Button.png';


function Login(){
    const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;

    const { Kakao } = window;

    const initKakao = () => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
        }
    }

    useEffect(() => {
        initKakao();
    }, []);

    const handleLogin = () => {
        Kakao.Auth.authorize({
            redirectUri : redirectUrl,
            scope : "profile_nickname, profile_image, birthday"
        });
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