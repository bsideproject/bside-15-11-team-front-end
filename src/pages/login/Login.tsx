import React, { useEffect } from "react";

function Login(){
    const restApiKey = 'ffefc95e6555a1eee5499d4cf824f9ec'; // REST API KEY
    const redirectUrl = 'http://localhost:8080/auth';
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

    const { Kakao } = window;

    const initKakao = () => {
        if (Kakao && !Kakao.isInitialized()) {
            Kakao.init("bd94eba67cf1b53443162a52cd86de50");
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
            github action test2
            <div className="button-container">
                <button onClick={handleLogin}>
                    <img src={`${process.env.PUBLIC_URL}/buttons/KaKao Button.png`} alt='카카오 로그인'/>
                </button>
            </div>
            <div className="login-btn-div">
                <button>
                    <img src={`${process.env.PUBLIC_URL}/buttons/Apple Button.png`} alt='애플 로그인'/>
                </button>
            </div>
        </div>
    )
};

export default Login;