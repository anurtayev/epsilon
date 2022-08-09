var crypto = require("crypto");
const keys = require("./publicKeys.json");

const jwtToken =
  "eyJraWQiOiIwVjA5bkNIc1wvcWhYSjBuQ2t0TVY5dlRUU0k3K3JqUHB3WHpcL3JGU1VXZTg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZDRiNjBjYy02MTU2LTRiZmYtOGNhMS1lYzM0MTllNDA4YTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTDMxVFdySmVXIiwiY29nbml0bzp1c2VybmFtZSI6ImFkNGI2MGNjLTYxNTYtNGJmZi04Y2ExLWVjMzQxOWU0MDhhMyIsIm9yaWdpbl9qdGkiOiIyNjdhNDVhMy1jZjRlLTRlY2UtODJhOS03NzY1ZWRiNTdlYzYiLCJhdWQiOiIxb252M2ZjZzVvM3JiazB2bGY5bmY1aDc4MyIsImV2ZW50X2lkIjoiMmE3OTA4ZGQtYmRhZC00YmY4LWFkMGQtYTVlZmEyZDRkNjg1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NjAwNDY0OTIsImV4cCI6MTY2MDA1MDA5MiwiaWF0IjoxNjYwMDQ2NDkyLCJqdGkiOiI1NzlmYmQ0Mi1jZWE3LTQzODItODAxMy0wMGQ1YTU1ZmRhODEiLCJlbWFpbCI6InRlbnpvcjY2NkB5YWhvby5jb20ifQ.Pu3Iju44QfI_tWF6U95nlCkRr6haHZGqklRa3te93tgi9YafqxsAs2LzHjh8bo51130b6tHKHDKp9AVtOwzNkqLD4FvGfgQQh78wXc1eOAqQaZn74SE3_wmfGZN9A5fHeUOyZi2MlWwp2C0XtYMNE_6tUkF6TBTN0-qLr2JOpvKhZoRh9J-UqasEeRqMJa5SW2nCLpRub4PSJIKUnKWMPCx9936ACn8B1njLzyO6nUBmmc0nsP88t9K2YAr1R200lYoA3A373x1uj3oKrGQ7Kkdooh7-9by2GrRJipWHs16pr6fVAV4_z7VCv9BZtZ3hJdmos5662xGjXUx5sFy_sg";

// check segments
var segments = jwtToken.split(".");
if (segments.length !== 3) {
  throw new Error("Not enough or too many segments");
}

// All segment should be base64
var headerSeg = segments[0];
var payloadSeg = segments[1];
var signatureSeg = segments[2];

// base64 decode and parse JSON
var header = JSON.parse(_base64urlDecode(headerSeg));
console.log("==> header: ", header);
var payload = JSON.parse(_base64urlDecode(payloadSeg));
console.log("==> payload", payload);

var signingMethod = "sha256";
var signingType = "hmac";

// Verify signature. `sign` will return base64 string.
var signingInput = [headerSeg, payloadSeg].join(".");

if (!_verify(signingInput, keys, signingMethod, signingType, signatureSeg)) {
  throw new Error("Signature verification failed");
}

// Support for nbf and exp claims.
// According to the RFC, they should be in seconds.
if (payload.nbf && Date.now() < payload.nbf * 1000) {
  throw new Error("Token not yet active");
}

if (payload.exp && Date.now() > payload.exp * 1000) {
  throw new Error("Token expired");
}

function _verify(input, key, method, type, signature) {
  if (type === "hmac") {
    return signature === _sign(input, key, method);
  } else {
    throw new Error("Algorithm type not recognized");
  }
}

function _sign(input, key, method) {
  return crypto.createHmac(method, key).update(input).digest("base64url");
}

function _base64urlDecode(str) {
  const buff = new Buffer(str, "base64");
  return buff.toString("ascii");
}
