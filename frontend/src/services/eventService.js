import api from "./api";
export const getEvents = async (params = {}) => (await api.get("/events", { params })).data;
export const getEventById = async (id) => (await api.get(`/events/${id}`)).data;
export const getMyEvents = async () => (await api.get("/events/organizer/my-events")).data;
export const createEvent = async (data) => (await api.post("/events", data, { headers: { "Content-Type": "multipart/form-data" } })).data;
export const updateEvent = async (id, data) => (await api.put(`/events/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
export const deleteEvent = async (id) => (await api.delete(`/events/${id}`)).data;
export const updateEventStatus = async (id, status) => (await api.patch(`/events/${id}/status`, { status })).data;
