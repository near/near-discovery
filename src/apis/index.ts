import * as http from '@/utils/http';

const insertedData = (accessToken: string) => {
  const dbName = 'cacheDb';
  const tableName = 'cache-v1';

  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event: any) => {
    const db = event?.target?.result;

    if (!db.objectStoreNames.contains(tableName)) {
      db.createObjectStore(tableName);
    }
  };

  request.onerror = (event: any) => {
    console.error('Failed to open database:', event.target?.error);
  };

  request.onsuccess = (event: any) => {
    const db = event.target?.result;
    const transaction = db.transaction(tableName, 'readwrite');
    const store = transaction.objectStore(tableName);

    const data = {
      key: '{"action":"LocalStorage","domain":{"src":"guessme.near/widget/ZKEVMWarmUp.add-to-quest-card","type":"public"},"key":"AccessKey"}',
      value: `Bearer ${accessToken}`,
    };

    const r = store.add(data.value, data.key);

    r.onsuccess = () => {
      console.log('Data inserted successfully.');
    };

    r.onerror = (event: any) => {
      store.put(data.value, data.key);
    };
  };
};

export const getAccessToken = async (address: string) => {
  const res = await http.post('/api/auth/access-token', {
    address,
  });
  window.localStorage.setItem(http.AUTH_TOKENS, JSON.stringify(res));
  insertedData(res.access_token);
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
