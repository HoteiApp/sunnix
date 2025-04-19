const apiUrl = process.env.REACT_APP_SERVER_URL ?? "no API url";
const token = process.env.REACT_APP_ACCESS_TOKEN ?? "no TOKEN AUTHORIZATION";

const get = (endpoint: string) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "include",
  });
};

const operation = (endpoint: string) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "include",
  });
};

const post = (endpoint: string, body?: BodyInit, options?: RequestInit) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "include",
    body: body,
    ...options,
  });
};

const upload = (endpoint: string, body?: BodyInit) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    body: body,
    credentials: "include",
  });
};

const put = (endpoint: string, body?: BodyInit) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "include",
    body: body,
  });
};

const remove = (endpoint: string, body?: BodyInit) => {
  return fetch(`${apiUrl}/${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
    credentials: "include",
    body: body,
  });
};

export { get, post, upload, put, operation, remove };
