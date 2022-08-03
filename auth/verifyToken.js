var crypto = require("crypto");
const keys = require("./publicKeys.json");

const jwtToken =
  "eyJraWQiOiJ0Mld6XC95dFFPRGp0YjVKMTZoUGFcL0lKSit1VVJ0SHh6OExcLzdLXC9zdStiYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4YjIyNzI5OS00OTU2LTQwYmYtYmNjNi1kMTgxY2NjZGM1NjQiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV95TzRaWlA1NWQiLCJjb2duaXRvOnVzZXJuYW1lIjoiOGIyMjcyOTktNDk1Ni00MGJmLWJjYzYtZDE4MWNjY2RjNTY0Iiwib3JpZ2luX2p0aSI6ImZkYzQyZDJlLWFhNzgtNDhkNy1iYmNmLWU3N2YyMTVjNTUxNiIsImF1ZCI6IjI5MjNnMmdxOW0zZjdrOTNjZ2EzY2h2N3MwIiwiZXZlbnRfaWQiOiIzOWEwNDkxYS1lMzZlLTQwODYtODk0Mi02N2MyOTUzMjRlOGQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY1NTU2MTE2OSwiZXhwIjoxNjU1NTY0NzY5LCJpYXQiOjE2NTU1NjExNjksImp0aSI6IjQ3ZGUyZDQ2LWE2MDUtNGQ4MC1iNTZlLTQ3MzFmOTNjOTMzMyIsImVtYWlsIjoidGVuem9yNjY2QHlhaG9vLmNvbSJ9.dFjZeSUB5fRgHlVaosxz8D85FpJ76uGowGBrHd7VRnaOgLCDzOewoAfcPm_BF5I8GkE34gvTyOWyhGWUjRm2_IkmjPfaBziN7JhUV29GVBOMMP3bUJtaN4UzinYjqMgw1A7Iden5q1s-DvBZQO_u3oUxxxeAmA-pCT7lqMsY1b26Ahb_cE52m9aN_mHDBvpg-OyMdX8haoDAhcZEIdes1zhU8-lrn7mbZFeA5HOj-b95-S8va22kQcF2XpY7ISmhnAGlejmDJnGq8ySn0nyRzl5kAb75PPeA1E-AShSW-xRwYgzPnHUPbSntNIB8TvM7wq3qFILF1dgNVutFqclM-Q";

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
