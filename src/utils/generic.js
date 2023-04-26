export const getEmailId = (email) => {
  return email.split("@")[0];
};

export const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const parseURLParams = (url) => {
  const params = new URLSearchParams(url);
  const data = {};
  for (const [key, value] of params) {
    data[key] = value;
  }
  return data;
};
