import apiConfig from "./apiConfig";

export default function customFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${apiConfig.API_URL}/${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  }).then((res) => {
    if (res.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.open("/login", "_self");
    }

    return res.json();
  });
}
