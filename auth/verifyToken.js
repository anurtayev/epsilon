const { CognitoJwtVerifier } = require("aws-jwt-verify");

exports.handler = async function (event, context) {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  const cognitoUserPoolId = headers["x-cognito-user-pool-id"];
  const cognitoUserPoolClientId = headers["x-cognito-user-pool-client-id"];
  const cognitoToken = headers["x-cognito-token"];

  const verifier = CognitoJwtVerifier.create({
    userPoolId: cognitoUserPoolId,
    tokenUse: "access",
    clientId: cognitoUserPoolClientId,
  });

  try {
    const payload = await verifier.verify(cognitoToken);
    console.log("Token is valid. Payload:", payload);
    return request;
  } catch (e) {
    console.log("Token not valid!", e);

    return {
      body: "content",
      bodyEncoding: "text",
      headers: {
        "x-custom-header": [
          {
            key: "x-custom-header",
            value: "custom-value",
          },
        ],
      },
      status: "200",
      statusDescription: "OK",
    };
  }
};
