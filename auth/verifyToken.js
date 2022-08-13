const { CognitoJwtVerifier } = require("aws-jwt-verify");

const AUTHORIZATION_HEADER = "authorization";
const CUSTOM_CLAIM_KEY = "application_name";
const CUSTOM_CLAIM_VALUE = "Aspan";

const extractCognitoParameters = (authorizationHeader) => {
  console.log("==>", authorizationHeader);
  const token = authorizationHeader.split("Bearer ")[1];
  console.log("==>  token", token);
  const decodedToken = Buffer.from(token.split(".")[1], "base64").toString(
    "utf8"
  );
  console.log("==> decoded token", decodedToken);

  const { iss, aud: cognitoUserPoolClientId } = JSON.parse(decodedToken);
  const cognitoUserPoolId = iss.split("/")[-1];

  return { cognitoUserPoolId, cognitoUserPoolClientId };
};

exports.handler = async function (event, context) {
  console.log(
    "incoming event",
    JSON.stringify(event.Records[0].cf.request, null, 2)
  );
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

  console.log("==>", authHeader.value);

  try {
    const { cognitoUserPoolId, cognitoUserPoolClientId } =
      extractCognitoParameters(authHeader.value);

    const verifier = CognitoJwtVerifier.create({
      userPoolId: cognitoUserPoolId,
      tokenUse: "id",
      clientId: cognitoUserPoolClientId,
    });

    const payload = await verifier.verify(cognitoToken);

    // TODO: implement custom claim challenge
    // if (payload[CUSTOM_CLAIM_KEY] !== CUSTOM_CLAIM_VALUE) {
    //   throw Error("<application_name> claim is not valid");
    // }

    return request;
  } catch (e) {
    console.log("invalid token", e);

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
