export const getRandomDateWithinPastDays = (days = 7) => {
  const now = new Date();
  const past = new Date(now.getTime() - Math.floor(Math.random() * days * 24 * 60 * 60 * 1000));
  return past;
}

export const formatDateISO = (date) => {
  return date.toISOString();
}

export const generateDummyJWT = () => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const defaultPayload = {
    sub: Math.floor(Math.random() * 10000).toString(),
    iat: Math.floor(Date.now() / 1000),
  };

  const base64url = (obj) =>
    btoa(JSON.stringify(obj))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const encodedHeader = base64url(header);
  const encodedPayload = base64url(defaultPayload);
  const dummySignature = `dummysignature1234567890`;

  return `${encodedHeader}.${encodedPayload}.${dummySignature}`;
}

export const generateRandomIP = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
}

export const generateUsername = (fullName) => {
  const newName = fullName.toLowerCase().replace(/ /g, "_");
  const randomNumber = Math.floor(10 + Math.random() * 90);
  return `${newName}@${randomNumber}`;
}

export const generateLog = () => {
  const loginTime = getRandomDateWithinPastDays(Math.floor(Math.random() * 7) + 1);
  const logoutTime = new Date(loginTime.getTime() + Math.floor(Math.random() * 180 + 30) * 60000); // +30-210 mins

  return {
    loginTime: formatDateISO(loginTime),
    logoutTime: formatDateISO(logoutTime),
    ipAddress: generateRandomIP(),
    jwtToken: generateDummyJWT()
  };
}


