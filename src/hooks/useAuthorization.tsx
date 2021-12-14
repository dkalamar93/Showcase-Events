import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { getAuthorizationToken } from '../api/user';
import { UserContext } from '../App';

export const useUserAuth = () => {
  const { setUser } = useContext(UserContext);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>();

  useEffect(() => {
    const refreshToken = async () => {
      await getOrRefreshTokens(setUser);

      setIsUserLoggedIn(!!cookies.get('AUTHORIZATION_TOKEN'));
    };

    refreshToken();
  }, []);

  const handleLogout = () => {
    cookies.remove('AUTHORIZATION_TOKEN');
    cookies.remove('REFRESH_TOKEN');
    navigate('/login', { replace: true });
  };

  return {
    isUserLoggedIn,
    handleLogout,
  };
};

export const getOrRefreshTokens = async (setUser) => {
  const cookies = new Cookies();

  if (cookies.get('REFRESH_TOKEN')) {
    const accessTokenResponseData = await getAuthorizationToken(
      cookies.get('REFRESH_TOKEN'),
    );

    if (accessTokenResponseData) {
      cookies.set(
        'AUTHORIZATION_TOKEN',
        accessTokenResponseData.headers.authorization,
        {
          maxAge: 50,
          path: '/',
        },
      );

      setUser(accessTokenResponseData?.data);

      return accessTokenResponseData;
    }
  }
  cookies.remove('AUTHORIZATION_TOKEN');
  cookies.remove('REFRESH_TOKEN');

  return false;
};
