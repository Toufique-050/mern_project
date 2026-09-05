import api from "./api";
export const getMyEventQR = async (eventId) => (await api.get(`/attendance/my-qr/${eventId}`)).data;
export const markAttendance = async (registrationId) => (await api.post("/attendance/mark", { registrationId })).data;
export const getEventAttendance = async (eventId) => (await api.get(`/attendance/event/${eventId}`)).data;
