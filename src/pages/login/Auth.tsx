import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RootStore from '../../store/RootStore';

const Auth = () => {

  const location = useLocation();

  useEffect(() => {
    RootStore.kakaoStore.doLogin(location)
      .catch(error => {
        console.error("Login error : ", error);
      });
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Auth;