export const getEmailId = (email) => {
  return email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_\-]/g, "-");
};

export const emailPattern = /\S+@\S+\.\S+/;

export const isValidEmail = (email) => {
  return emailPattern.test(email);
};

export const parseURLParams = (url) => {
  const params = new URLSearchParams(url);
  const data = {};
  for (const [key, value] of params) {
    data[key] = value;
  }
  return data;
};
