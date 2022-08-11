const { CognitoJwtVerifier } = require("aws-jwt-verify");

exports.handler = async function (event, context) {
  console.log("EVENT: \n" + JSON.stringify(event, null, 2));
  console.log("CONTEXT: \n" + JSON.stringify(context, null, 2));

  // const verifier = CognitoJwtVerifier.create({
  //   userPoolId: cognitoUserPoolId,
  //   tokenUse: "access",
  //   clientId: cognitoUserPoolClientId,
  // });

  // try {
  //   const payload = await verifier.verify(
  //     "eyJraWQiOiJJanVTRTNPZHJraEJucGxTdTJQVjJkakthUHhFWlN1VlE3VzQxa1orVnhJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZDRiNjBjYy02MTU2LTRiZmYtOGNhMS1lYzM0MTllNDA4YTMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9MMzFUV3JKZVciLCJjbGllbnRfaWQiOiIxb252M2ZjZzVvM3JiazB2bGY5bmY1aDc4MyIsIm9yaWdpbl9qdGkiOiJhYTQ0ZDRhZi05NDgwLTQ0OTgtODhjMC03OTZkMmVhZDVjODUiLCJldmVudF9pZCI6IjY1ZGI4MjczLTJkZDQtNGE0ZC05NTE0LWFhMmM2NzE2YjFlZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NjAwODk5NzAsImV4cCI6MTY2MDA5MzU3MCwiaWF0IjoxNjYwMDg5OTcwLCJqdGkiOiI5ZWE0ZTE3Ny04M2FmLTQ5MWQtYjMzNS00ODU5YzUzOGQ5OGQiLCJ1c2VybmFtZSI6ImFkNGI2MGNjLTYxNTYtNGJmZi04Y2ExLWVjMzQxOWU0MDhhMyJ9.UgGMavPPaiiTLfwYB4B-YHfEQzMugHUtPZ1JUGYn8ww0AaN6QISpVVIHEoaKK98ImFYGsKYliUj3MFVWExDK1lSYfbwyk526kbRr1YR40AFKAq8ESzTp9Wl2vU1Z5AryBOKaRNoyUz3Co3ew8d1113VaiE6cFz4d4dwm7PttJuhNhfuMEQmL-IS6XoWVbM7fnvTZYtNGfgt-GyuUTPu75SYj63xs7u_W2nNoaw5uhaDGFELi9t7dTVqOD8cyanMf8xUs04HPGr3jpWu0fb7tU6mt2UmEZObxdUh9a11B8EvsiZr34oY5IhLIFdEo3pJAxEWRlfDrE5316vCI0tYieA"
  //   );
  //   console.log("Token is valid. Payload:", payload);
  // } catch (e) {
  //   console.log("Token not valid!", e);
  // }

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
};
