import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';

export const baseUrl = 'https://testproject-api-v2.strv.com';

export const axiosInstance = () => {
  const cookies = new Cookies();

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookies.get('AUTHORIZATION_TOKEN') || '',
      APIkey: process.env.REACT_APP_EVENTIO_API || '',
    },
  });
};

export const axiosGet = async <T = any>(
  url: string,
  options?: AxiosRequestConfig,
) => {
  const axiosResponse = await axiosInstance().get<T>(
    `${baseUrl}${url}`,
    options,
  );

  return axiosResponse?.data;
};

export const axiosPost = async <T = any>(
  url: string,
  body: any,
  options?: AxiosRequestConfig,
) => {
  try {
    const axiosResponse = await axiosInstance().post<T>(
      `${baseUrl}${url}`,
      body,
      options,
    );

    return axiosResponse?.data;
  } catch (error) {
    return null;
  }
};

export const axiosDelete = async <T = any>(
  url: string,
  options?: AxiosRequestConfig,
) => {
  try {
    const axiosResponse = await axiosInstance().delete<T>(
      `${baseUrl}${url}`,
      options,
    );

    return axiosResponse?.data;
  } catch (error) {
    return null;
  }
};
