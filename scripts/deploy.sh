#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

timestamp=$(date +%Y%m%d%H%M%S)
echo "Timestamp: $timestamp"
stackName=${PROJECT}-${NODE_ENV}
echo "StackName: $stackName"

aws s3 sync cloudformation s3://$S3_DEPLOYMENT_BUCKET/cloudformation || exit 1
aws cloudformation validate-template \
  --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
  || exit 1

rm -rf build
rm -rf deploy
tsc || exit 1
docker build -t epsilon-deploy .
docker cp $(docker create --rm epsilon-deploy):/app/node_modules build/node_modules
mkdir deploy
zip deploy/${stackName}-${timestamp}.zip build/* -r -q

aws s3 sync deploy s3://$S3_DEPLOYMENT_BUCKET || exit 1

if aws cloudformation describe-stacks --stack-name ${stackName}
then
  aws cloudformation update-stack \
    --stack-name ${stackName} \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=Timestamp,ParameterValue=${timestamp} \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
  || exit 1
else
  aws cloudformation create-stack \
    --stack-name ${stackName} \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=Timestamp,ParameterValue=${timestamp} \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
  || exit 1
fi

    