import apiClient from './api-client';

interface objectany {
  [key: string]: string;
}

// Base function for GET requests
const get = async (route: string, user?: { token: string }) => {
  const headers: objectany = {
    Accept: 'application/json',
  };

  if (user?.token) {
    headers.Authorization = `Bearer ${user.token}`;
  } else {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
  }

  return apiClient({
    method: 'get',
    url: route,
    headers,
  });
};

// Base function for POST requests
const post = async (route: string, { body, user }: { body?: object; user?: objectany }) => {
  const headers: objectany = {
    Accept: 'application/json',
  };
  if (user?.token) {
    headers.Authorization = `Bearer ${user?.token}`;
  } else {
    const token = localStorage.getItem('token');
    headers.Authorization = `Bearer ${token}`;
  }

  return apiClient({
    method: 'post',
    url: route,
    headers,
    data: body,
  });
};

export { get, post };
