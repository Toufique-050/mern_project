import api from "./api";
export const getMyCertificates = async () => (await api.get("/certificates/my")).data;
export const generateCertificate = async (eventId, studentId) => (await api.post("/certificates/generate", { eventId, studentId })).data;
export const downloadCertificate = async (id) => {
  const response = await api.get(`/certificates/${id}/download`, { responseType: "blob" });
  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url; link.download = `certificate-${id}.pdf`;
  document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
};
