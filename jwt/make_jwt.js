const crypto = require("crypto");

const base64 = (json) => {
  const jsonString = JSON.stringify(json);
  const jsonBase64 = Buffer.from(jsonString).toString("base64");
  const jsonB64NoPadding = jsonBase64.replace(/={1,2}$/, "");
  return jsonB64NoPadding;
};

// 秘密鍵 key で data を暗号化する
const hmac_sha256 = (key, data) => {
  const hash = crypto.createHmac("sha256", key).update(data).digest("base64");
  const hashNoPadding = hash.replace(/={1,2}$/, "");
  return hashNoPadding;
};

const header = { alg: "HS256", typ: "JWT" };
const payload = { sub: "1234567890", iat: 1516239022 };
const key = "secret";
const unsignedToken = `${base64(header)}.${base64(payload)}`;
const signature = hmac_sha256(key, unsignedToken);
const jwt = `${unsignedToken}.${signature}`;
console.log(unsignedToken);
console.log(signature);
console.log(jwt);
