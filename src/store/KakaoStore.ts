import { action, computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import queryString from 'query-string';
import { Location } from 'react-router';
import { get, post } from '../apis/RestApis';
import { KakaoTokenResponse, KakaoUserResponse } from '../models/KakaoResponse';

class KakaoStore {

  Kakao : any = window.Kakao;

  rootStore : typeof RootStore;
  token : string = '';
  redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  userData : KakaoUserResponse = {};

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      token : observable,
      userData : observable,
      getToken : computed,
      getUserData : computed,
      setToken : action,
      doLogin : action,
      setUserData : action
    });

  }

  get getToken() {
    return this.token;
  }

  setToken = (token : string) => {
    this.token = token;
  }

  get getUserData() {
    return this.userData;
  }

  setUserData = (data : KakaoUserResponse) => {
    this.userData = data;
  }

  // 카카오 서버로 정보제공 동의 요청하는 페이지로 이동
  // 유저가 동의 버튼을 클릭하면 redirect_uri로 인가코드가 넘어온다.
  requestAuthCode = async() => {
    await this.Kakao.Auth.authorize({
      redirectUri : this.redirectUrl,
      scope : "profile_nickname, profile_image, birthday, gender, age_range"
    });
  }

  // 카카오 로그인 초기화하는 설정
  initKakao = () => {
    if (this.Kakao && !this.Kakao.isInitialized()) {
        this.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }

  doLogin = async(location : Location) : Promise<KakaoUserResponse> => {
    const params = location.search;
    const query = queryString.parse(params);

    console.log("code : " + JSON.stringify(query.code));

    const grantType : string = "authorization_code";
    const appKey : string = process.env.REACT_APP_KAKAO_REST_API_KEY as string;
    const redirectUri: string  = process.env.REACT_APP_KAKAO_REDIRECT_URI as string;
    const code : string = query.code as string;

    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", grantType);
    requestBody.append("client_id", appKey);
    requestBody.append("redirect_uri", redirectUri);
    requestBody.append("code", code);

    try {
      const response : KakaoTokenResponse  = await post('https://kauth.kakao.com/oauth/token', requestBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      
      if (response.access_token) {
        this.setToken(response.access_token);
      }

    } catch(error) {
      console.error(error);
    }

    return await this.getKakaoUserData();
  }

  getKakaoUserData = async() : Promise<KakaoUserResponse> => {
    console.log("token : " + this.getToken);
    const response : KakaoUserResponse = await get('https://kapi.kakao.com/v2/user/me', {
      headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : `Bearer ${this.getToken}`
      }
    });

    if (response.id) {
      this.setUserData(response);
    }

    return response;
  }
}

export default KakaoStore;