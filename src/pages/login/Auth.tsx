import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const Auth = () => {

  const location = useLocation();

  useEffect(() => {
    doLogin();
  }, []);

  const doLogin = async() => {
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
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      
    </div>
  );
};

export default Auth;