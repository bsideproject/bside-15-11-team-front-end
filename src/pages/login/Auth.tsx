import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RootStore from '../../store/RootStore';
import { UserGetRequestProto } from '../../prototypes/user/UserRequestProto';
import { OauthServiceTypeProto } from '../../prototypes/common/type/OauthServiceTypeProto';
import NullChecker from '../../utils/NullChecker';
import { KakaoUserResponse } from '../../models/KakaoResponse';
import { UserResponseProto } from '../../prototypes/user/UserResponseProto';

const Auth = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    const doLogin = async() => {

      const kakaoData : KakaoUserResponse = await RootStore.kakaoStore.doLogin(location);
  
      console.log("user data : " + JSON.stringify(kakaoData));

      const userGetRequest : UserGetRequestProto = convertResponse2GetRequest(kakaoData.id as string, OauthServiceTypeProto.KAKAO);

      const backendResponse : UserResponseProto = await RootStore.userStore.getUser(userGetRequest);

      console.log("user data in DB : " + JSON.stringify(backendResponse));
      
      // db에 저장안되어 있을 경우 -> 신규 유저이므로 약관 화면으로 보내버림
      if (NullChecker.isEmpty(JSON.stringify(backendResponse))) {

        // const userPatchRequest : UserPatchRequestProto = convertResponse2PatchRequest(kakaoData, OauthServiceTypeProto.KAKAO);

        // const patchData = await RootStore.userStore.patchUser(userPatchRequest);

        // console.log("patchData : " + JSON.stringify(patchData));
        navigate("/page/agreement");
      } else {
        navigate("/page/main");

        // 임시로 가입된 경우에 post를 보내봄

        await RootStore.userStore.postUser(backendResponse.sequence as string);
      }

    }

    doLogin();
  }, []);

  const convertResponse2GetRequest = (id : string, oauthType : OauthServiceTypeProto) : UserGetRequestProto => {

    const request : UserGetRequestProto = {
      serviceUserId : id,
      oauthServiceType : oauthType
    }

    return request;
  }

  return (
    <div>
      
    </div>
  );
};

export default Auth;