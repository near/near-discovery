import * as http from '@/utils/http';

export const getAccessToken = async (address: string) => {
  const res = await http.post('/api/auth/access-token', {
    address,
  });
  window.localStorage.setItem(http.AUTH_TOKENS, JSON.stringify(res));
};

export const refreshAccessToken = async () => {
  const tokens = JSON.parse(window.localStorage.getItem(http.AUTH_TOKENS) || '{}');
  const res = await http.post('/api/auth/refresh-access-token', {
    refresh_token: tokens.refresh_access_token,
  });
  window.localStorage.setItem(
    http.AUTH_TOKENS,
    JSON.stringify({
      ...tokens,
      access_token: res.access_token,
    }),
  );
};
