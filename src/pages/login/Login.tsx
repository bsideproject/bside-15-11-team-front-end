import React, { useEffect } from "react";

function Login(){
    const restApiKey = 'ffefc95e6555a1eee5499d4cf824f9ec';
    const redirectUrl = 'http://localhost:3000/auth';
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

    const { Kakao } = window;

    const initKakao = () => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init("KAKAO_API_KEY");
        }
    }

    useEffect(() => {
        initKakao();
    }, []);

    const handleLogin = () => {
        Kakao.Auth.authorize({
            redirectUri : redirectUrl,
            scope : "profile_nickname, profile_image"
        });
    }

    return(
        <div className="Login">
            <div className="greeting">
                <h2>반가워요!</h2>
                <p>소중한 사람들과 주고 받은</p>
                <p>소중한 마음들을 기록하는 앱</p>
                <p>맘관부에요</p>
            </div>
            <div className="button-container">
                <button id="kakao-login-btn"
                    onClick={handleLogin}>
                    <img src={`${process.env.PUBLIC_URL}/kakao/ko/kakao_login_large_wide.png`} 
                        alt="카카오 로그인"></img>
                </button>
            </div>
        </div>
    )
};

export default Login;