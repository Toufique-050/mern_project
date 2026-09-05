import { API_ROOT } from "../services/api";
export const assetUrl = (value) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_ROOT}${value.startsWith("/") ? value : `/${value}`}`;
};
export const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
export const formatDateTime = (date, time) => `${formatDate(date)}${time ? ` · ${time}` : ""}`;
export const errorMessage = (error, fallback = "Something went wrong. Please try again.") => error?.response?.data?.message || error?.response?.data?.errors?.join(", ") || error?.message || fallback;
export const initials = (name = "User") => name.split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
