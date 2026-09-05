import api from "./api";
export const submitFeedback = async (data) => (await api.post("/feedback", data)).data;
export const getMyFeedback = async () => (await api.get("/feedback/my")).data;
export const getEventFeedback = async (eventId) => (await api.get(`/feedback/event/${eventId}`)).data;
export const updateFeedbackVisibility = async (id, isVisible) => (await api.patch(`/feedback/${id}/visibility`, { isVisible })).data;
