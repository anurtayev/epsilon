var crypto = require("crypto");
const keys = require("./publicKeys.json");

const jwtToken =
  "eyJraWQiOiIwVjA5bkNIc1wvcWhYSjBuQ2t0TVY5dlRUU0k3K3JqUHB3WHpcL3JGU1VXZTg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhZDRiNjBjYy02MTU2LTRiZmYtOGNhMS1lYzM0MTllNDA4YTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTDMxVFdySmVXIiwiY29nbml0bzp1c2VybmFtZSI6ImFkNGI2MGNjLTYxNTYtNGJmZi04Y2ExLWVjMzQxOWU0MDhhMyIsIm9yaWdpbl9qdGkiOiI4NTBjNTFmZi04OWI0LTQ4MjItOWMxZC03NzNiMWY4ZmY0M2UiLCJhdWQiOiIxb252M2ZjZzVvM3JiazB2bGY5bmY1aDc4MyIsImV2ZW50X2lkIjoiOWQyNTQ2OTMtMmE3MS00YTEzLTlkM2YtYmFkNjRmOGMzOTk4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NjAwMTU3MzIsImV4cCI6MTY2MDAxOTMzMiwiaWF0IjoxNjYwMDE1NzMyLCJqdGkiOiJiNzM1NmI5OS03OWZjLTQwZWUtOGZhMC1kM2NjYTFlODY4OGEiLCJlbWFpbCI6InRlbnpvcjY2NkB5YWhvby5jb20ifQ.VGOi2CM9x4FZpweuj_WJgLX69dll2nLIC2t1bx8hOhSpq54TdH2YO-pVavuQxsIS6d77IkVCjl2zDGsbPoxaWqj7aoVgVMxmpvHOGOWzm8_cvYS5LOfq1TmVZrahimnQuN_EQE3jgb--Cu1t-Rp75Whpas70AwN3YBincWWRC9XZPK9BV1IOdiBTwec7RlvkxX_RULQsk9Cp7wJw5TUp7N5xbJ8VDNcu4WOjk-fOzbYb8PGpK4jW7Oap2Ah6bSoVMa6ZRKE7Nrqb3f9lUC27N3iGMM3VwEjCPYAs1MCBYrHMsa0hi-dXbAM0_aAkatLEo4ShxbgB1biE25vljiUVLw";

function jwt_decode(token, keys, noVerify, algorithm) {
  // check token
  if (!token) {
    throw new Error("No token supplied");
  }
  // check segments
  var segments = token.split(".");
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

  if (!noVerify) {
    var signingMethod = "sha256";
    var signingType = "hmac";

    // Verify signature. `sign` will return base64 string.
    var signingInput = [headerSeg, payloadSeg].join(".");

    if (
      !_verify(signingInput, keys, signingMethod, signingType, signatureSeg)
    ) {
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
  }

  return payload;
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
  return String.bytesFrom(str, "base64url");
}

try {
  jwt_decode(jwtToken, keys);
} catch (e) {
  console.log(e);
}
