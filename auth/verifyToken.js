const { CognitoJwtVerifier } = require("aws-jwt-verify");

const AUTHORIZATION_HEADER = "authorization";
const CUSTOM_CLAIM_KEY = "application_name";
const CUSTOM_CLAIM_VALUE = "Aspan";

const extractCognitoParameters = (token) => {
  console.log("==>  token", token);
  const decodedToken = Buffer.from(token.split(".")[1], "base64").toString(
    "utf8"
  );
  console.log("==> decoded token", decodedToken);

  const { iss, aud: cognitoUserPoolClientId } = JSON.parse(decodedToken);
  const cognitoUserPoolId = iss.split("/").slice(-1)[0];

  return { cognitoUserPoolId, cognitoUserPoolClientId };
};

exports.handler = async function (event, context) {
  console.log("incoming event", JSON.stringify(event, null, 2));
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const authHeaderArray =
    headers[
      Reflect.ownKeys(headers).find(
        (header) => header.toLowerCase() === AUTHORIZATION_HEADER
      )
    ];
  const authHeader = authHeaderArray.find(
    ({ key }) => key.toLowerCase() === AUTHORIZATION_HEADER
  );

  try {
    const cognitoToken = authHeader.value.split("Bearer ")[1];

    const { cognitoUserPoolId, cognitoUserPoolClientId } =
      extractCognitoParameters(cognitoToken);
    console.log("==> cognitoUserPoolId", cognitoUserPoolId);
    console.log("==> cognitoUserPoolClientId", cognitoUserPoolClientId);

    const verifier = CognitoJwtVerifier.create({
      userPoolId: cognitoUserPoolId,
      tokenUse: "id",
      clientId: cognitoUserPoolClientId,
    });

    const payload = await verifier.verify(cognitoToken);

    console.log("==> payload", payload);

    // TODO: implement custom claim challenge
    // if (payload[CUSTOM_CLAIM_KEY] !== CUSTOM_CLAIM_VALUE) {
    //   throw Error("<application_name> claim is not valid");
    // }

    return request;
  } catch (e) {
    console.log("invalid token", e.message, typeof e);

    return {
      body: "Forbidden",
      bodyEncoding: "text",
      headers: {
        "x-aspan-header": [
          {
            key: "x-aspan-header",
            value: CUSTOM_CLAIM_VALUE,
          },
        ],
      },
      status: "403",
      statusDescription: "Forbidden",
    };
  }
};
