const AWS = require("aws-sdk");

const stackName = process.argv[2];
console.log("CloudFormation deployment has started for", stackName);
const timerName = `${stackName} deployment elapsed time`;
console.time(timerName);

const cloudformation = new AWS.CloudFormation({
  apiVersion: "2010-05-15",
  region: "us-east-1",
});

const sleep = async (interval) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(), interval);
  });

const finishedStatuses = [
  "CREATE_FAILED",
  "CREATE_COMPLETE",
  "ROLLBACK_FAILED",
  "ROLLBACK_COMPLETE",
  "DELETE_FAILED",
  "DELETE_COMPLETE",
  "UPDATE_COMPLETE",
  "UPDATE_FAILED",
  "UPDATE_ROLLBACK_FAILED",
  "UPDATE_ROLLBACK_COMPLETE",
  "IMPORT_COMPLETE",
  "IMPORT_ROLLBACK_FAILED",
  "IMPORT_ROLLBACK_COMPLETE",
];

const getStackDescription = async () =>
  cloudformation.describeStacks({ StackName: stackName }).promise();

const run = async () => {
  let stackStatus;
  while (!finishedStatuses.some((status) => status === stackStatus)) {
    stackStatus = (await getStackDescription()).Stacks[0].StackStatus;
    process.stdout.write(".");
    await sleep(2000);
  }
  console.log(
    `\n${stackName} deployment has finished with ${stackStatus} status`
  );
  console.timeEnd(timerName);
};

run();
