const AWS = require("aws-sdk");

const stackName = `${process.env.PROJECT}-${process.env.NODE_ENV}`;

const cloudformation = new AWS.CloudFormation({
  apiVersion: "2010-05-15",
  region: "us-east-1",
});

const run = async () => {
  const {
    Stacks: [{ Outputs }],
  } = await cloudformation.describeStacks({ StackName: stackName }).promise();

  console.log(Outputs);
};

run();
