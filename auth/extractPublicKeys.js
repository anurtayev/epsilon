const Axios = require("axios");
const jwkToPem = require("jwk-to-pem");
const fs = require("fs");
const path = require("path");

const cognitoIssuer =
  "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_3kIDIKyEE";

const getPublicKeys = async () => {
  const url = `${cognitoIssuer}/.well-known/jwks.json`;
  const publicKeys = await Axios.default.get(url);
  const cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
    const pem = jwkToPem(current);
    agg[current.kid] = { instance: current, pem };
    return agg;
  }, {});

  fs.writeFileSync(__dirname + "/publicKeys.json", JSON.stringify(cacheKeys));
};

getPublicKeys();
