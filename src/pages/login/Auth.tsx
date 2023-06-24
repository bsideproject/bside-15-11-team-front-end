import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RootStore from '../../store/RootStore';
import { UserGetRequest } from '../../prototypes/user/UserRequest';
import { OauthServiceType } from '../../prototypes/common/type/OauthServiceType';
import NullChecker from '../../utils/NullChecker';

const Auth = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const doLogin = async() => {

      let nextPage = "";

      const kakaoData = await RootStore.kakaoStore.doLogin(location)
        .catch(error => {
          console.error("Login error : ", error);
        });
  
      console.log("user data : " + JSON.stringify(kakaoData));

      const userRequest = convertResponse(kakaoData);

      const backendResponse : any = await RootStore.userStore.getUser(userRequest)
        .catch(error => {
          console.error("Server Api Error : ", error);
        });

      console.log("user data in DB : " + JSON.stringify(backendResponse));
      
      // db에 저장안되어 있을 경우 -> 신규 유저이므로 약관 화면으로 보내버림
      if (NullChecker.isEmpty(JSON.stringify(backendResponse))) {
        const patchData = await RootStore.userStore.patchUser(userRequest, kakaoData);

        console.log("patchData : " + JSON.stringify(patchData));
        navigate("/agreement");
      } else {
        navigate("/main");

        // 임시로 가입된 경우에 post를 보내봄

        await RootStore.userStore.postUser(backendResponse.sequence);
      }

    }

    doLogin();
  }, []);

  const convertResponse = (obj : any) : UserGetRequest => {
    const request : UserGetRequest = {
      serviceUserId : obj.id,
      oauthServiceType : OauthServiceType.KAKAO
    };

    return request;
  }

  return (
    <div>
      
    </div>
  );
};

export default Auth;