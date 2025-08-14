export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getBasicHeaders = () => ({
  "Content-Type": "application/json",
});

export const getAuthOnlyHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getHttp = async (
  url,
  method = "GET",
  headers = {},
  body = null
) => {
  const config = { method, headers };
  if (body)
    config.body = typeof body === "string" ? body : JSON.stringify(body);

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return null;
};
