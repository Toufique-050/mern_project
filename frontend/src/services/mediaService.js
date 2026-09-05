import api from "./api";
export const getGallery = async (params = {}) => (await api.get("/media", { params })).data;
export const uploadMedia = async (formData) => (await api.post("/media", formData, { headers: { "Content-Type": "multipart/form-data" } })).data;
export const deleteMedia = async (id) => (await api.delete(`/media/${id}`)).data;
