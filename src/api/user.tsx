import Cookies from 'universal-cookie';

import { axiosInstance, baseUrl } from './base';

export const authenticate = async (email, password) => {
  try {
    const axiosResponse = await axiosInstance().post(`${baseUrl}/auth/native`, {
      email,
      password,
    });
    const cookies = new Cookies();

    cookies.set('AUTHORIZATION_TOKEN', axiosResponse.headers.authorization, {
      maxAge: 500,
      path: '/',
    });
    cookies.set('REFRESH_TOKEN', axiosResponse.headers['refresh-token'], {
      maxAge: 3000,
    });

    return axiosResponse;
  } catch (error) {
    return null;
  }
};

export const getAuthorizationToken = async (refreshToken) => {
  try {
    const axiosResponse = await axiosInstance().post(`${baseUrl}/auth/native`, {
      refreshToken,
    });

    return axiosResponse;
  } catch (error) {
    return null;
  }
};
