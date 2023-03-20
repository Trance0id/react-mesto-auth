export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (formData) => {
  console.log(JSON.stringify(formData));
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
};

export const authorize = (formData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
