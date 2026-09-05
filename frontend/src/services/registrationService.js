import api from "./api";
export const registerForEvent = async (eventId) => (await api.post("/registrations", { eventId })).data;
export const getMyRegistrations = async () => (await api.get("/registrations/my")).data;
export const cancelRegistration = async (id) => (await api.patch(`/registrations/${id}/cancel`)).data;
export const getEventRegistrations = async (eventId) => (await api.get(`/registrations/event/${eventId}`)).data;
