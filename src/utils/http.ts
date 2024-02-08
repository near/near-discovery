export const removeEmptyKeys = (obj: Record<string, any>): Record<string, any> => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  });
  return obj;
};

export const objectToQueryString = (obj: Record<string, any>): string => {
  const keyValuePairs = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        for (const val of value) {
          keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        }
      } else {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  return keyValuePairs.join('&');
};

const AUTH_TOKENS = 'AUTH_TOKENS';

const BASE_URL = 'https://test-api.dapdap.tech';

const getUrl = (url: string) => {
  return url.startsWith('http') ? url : `${BASE_URL}${url}`;
};

const get = async (url: string, query?: Record<string, any>) => {
  const tokens = JSON.parse(window.localStorage.getItem(AUTH_TOKENS) || '{}');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.access_token || ''}`,
      'Content-Type': 'application/json',
    },
  };
  if (!query) {
    const res = await fetch(getUrl(url), options);
    return res.json() as any;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);
  const res = await fetch(`${getUrl(url)}?${queryStr}`, options);
  return res.json() as any;
};

const getWithoutActive = async (url: string, activity: 'coin68' | 'bitget', query?: Record<string, any>) => {
  const tokens = JSON.parse(window.localStorage.getItem(AUTH_TOKENS) || '{}');
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.access_token || ''}`,
      'Content-Type': 'application/json',
      activity,
    },
  };
  if (!query) {
    const res = await fetch(getUrl(url), options);
    return res.json() as any;
  }

  query = removeEmptyKeys(query);
  const queryStr = objectToQueryString(query);
  const res = await fetch(`${getUrl(url)}?${queryStr}`, options);
  return res.json() as any;
};

const post = async (url: string, data: object) => {
  const tokens = JSON.parse(window.localStorage.getItem(AUTH_TOKENS) || '{}');
  const res = await fetch(getUrl(url), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokens.access_token || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (await res.json()) as any;
};

const deleteRequest = async (url: string, data: object) => {
  const tokens = JSON.parse(window.localStorage.getItem(AUTH_TOKENS) || '{}');
  const res = await fetch(getUrl(url), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${tokens.access_token || ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return (await res.json()) as any;
};

export { get, post, getWithoutActive, deleteRequest, AUTH_TOKENS };
