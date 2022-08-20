exports.handler = async function (event, context) {
  console.log("incoming event", JSON.stringify(event, null, 2));
  const response = event.Records[0].cf.response;

  response.headers["access-control-allow-origin"] = [
    {
      key: "Access-Control-Allow-Origin",
      value: "*",
    },
  ];

  response.headers["access-control-max-age"] = [
    {
      key: "Access-Control-Max-Age",
      value: "0",
    },
  ];

  response.headers["access-control-expose-headers"] = [
    {
      key: "Access-Control-Expose-Headers",
      value: "*",
    },
  ];

  response.headers["access-control-allow-methods"] = [
    {
      key: "Access-Control-Allow-Methods",
      value: "*",
    },
  ];

  return response;
};
