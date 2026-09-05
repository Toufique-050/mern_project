import api from "./api";
export const getAdminStats = async () => (await api.get("/admin/dashboard")).data;
export const getAdminUsers = async (params = {}) => (await api.get("/admin/users", { params })).data;
export const updateAdminUser = async (id, data) =>
    (await api.patch(`/admin/users/${id}`, data)).data;
export const getAdminEvents = async () => (await api.get("/admin/events")).data;
export const getAdminFeedback = async () => (await api.get("/admin/feedback")).data;
