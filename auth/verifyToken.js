const { CognitoJwtVerifier } = require("aws-jwt-verify");

// const CUSTOM_CLAIM_KEY = "application_name";
// const CUSTOM_CLAIM_VALUE = "Aspan";

const extractCognitoParameters = (authorizationHeader) => {
  const { cognitoUserPoolId, cognitoUserPoolClientId } = JSON.parse(
    Buffer.from(
      authorizationHeader.split("Bearer ")[1].split(".")[1],
      "base64"
    ).toString("utf8")
  );

  return { cognitoUserPoolId, cognitoUserPoolClientId };
};

exports.handler = async function (event, context) {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  try {
    const { cognitoUserPoolId, cognitoUserPoolClientId } =
      extractCognitoParameters(headers["authorization"]);

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
