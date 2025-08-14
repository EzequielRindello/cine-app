import { useState, useCallback } from "react";
import { getAuthHeaders, getBasicHeaders } from "../helpers/httpHelpers";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let errorMessage = `HTTP error. Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Error: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setLoading(false);
        return data;
      } else {
        setLoading(false);
        return true;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const get = useCallback(
    (url, requiresAuth = false) => {
      const headers = requiresAuth ? getAuthHeaders() : {};
      return request(url, { method: "GET", headers });
    },
    [request]
  );

  const post = useCallback(
    (url, data, requiresAuth = false) => {
      const headers = requiresAuth ? getAuthHeaders() : getBasicHeaders();
      return request(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
    },
    [request]
  );

  const put = useCallback(
    (url, data, requiresAuth = false) => {
      const headers = requiresAuth ? getAuthHeaders() : getBasicHeaders();
      return request(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
    },
    [request]
  );

  const del = useCallback(
    (url, requiresAuth = false) => {
      const headers = requiresAuth ? getAuthHeaders() : {};
      return request(url, { method: "DELETE", headers });
    },
    [request]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    delete: del,
    clearError,
  };
};
