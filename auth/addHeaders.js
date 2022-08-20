exports.handler = async function (event, context) {
  console.log("incoming event", JSON.stringify(event, null, 2));
  const response = event.Records[0].cf.response;

  response.headers["Allowed-shit"] = { value: "sdfsdf" };

  return response;
};
