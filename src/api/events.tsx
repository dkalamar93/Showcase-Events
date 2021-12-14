import { axiosDelete, axiosGet, axiosPost } from './base';

export const getEventList = () => axiosGet('/events');

export const getEventDetail = (id) => axiosGet(`/events/${id}`);

export const createEvent = (data) => axiosPost('/events', data);

export const attendEvent = (id) => axiosPost(`/events/${id}/attendees/me`, {});

export const unattendEvent = (id) =>
  axiosDelete(`/events/${id}/attendees/me`, {});
