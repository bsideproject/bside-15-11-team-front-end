import { action, computed, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import queryString from 'query-string';
import axios from 'axios';
import { Location } from 'react-router';

class KakaoStore {

  Kakao : any = window.Kakao;

  rootStore : typeof RootStore;
  token : string = '';
  redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  constructor(rootStore : typeof RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      token : observable,
      getToken : computed,
      setToken : action,
      doLogin : action
    });

  }

  get getToken() {
    return this.token;
  }

  setToken = (token : string) => {
    this.token = token;
  }

  // 카카오 서버로 정보제공 동의 요청하는 페이지로 이동
  // 유저가 동의 버튼을 클릭하면 redirect_uri로 인가코드가 넘어온다.
  requestAuthCode = async() => {
    await this.Kakao.Auth.authorize({
      redirectUri : this.redirectUrl,
      scope : "profile_nickname, profile_image, birthday"
    });
  }

  // 카카오 로그인 초기화하는 설정
  initKakao = () => {
    if (this.Kakao && !this.Kakao.isInitialized()) {
        this.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    }
  }

  doLogin = async(location : Location) => {
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
      const response  = await axios.post('https://kauth.kakao.com/oauth/token', requestBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response.data);
      
      if (response?.data?.access_token) {
        this.setToken(response.data['access_token']);
      }

      return await this.getKakaoUserData();
    } catch(error) {
      console.error(error);
    }
  }

  getKakaoUserData = async() => {
    console.log("token : " + this.getToken);
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : `Bearer ${this.getToken}`
      }
    });

    return response.data;
  }
}

export default KakaoStore;