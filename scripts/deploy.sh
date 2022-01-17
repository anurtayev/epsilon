#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

timestamp=$(date +%Y%m%d%H%M%S)
echo "Timestamp: $timestamp"
stackName=${PROJECT}-${NODE_ENV}
echo "StackName: $stackName"

aws s3 sync cloudformation s3://$S3_DEPLOYMENT_BUCKET/cloudformation --delete || exit 1
aws s3 mv s3://$S3_DEPLOYMENT_BUCKET/cloudformation/schema.graphql s3://$S3_DEPLOYMENT_BUCKET/cloudformation/schema_${timestamp}.graphql || exit 1
aws cloudformation validate-template \
  --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
  > /dev/null || exit 1

rm -rf build
rm -rf deploy
tsc || exit 1
docker build -t $stackName .
docker cp $(docker create --name $stackName $stackName):/app/node_modules build/node_modules
docker rm $stackName > /dev/null
mkdir deploy
zip deploy/${stackName}-${timestamp}.zip build/* -r -q

aws s3 sync deploy s3://$S3_DEPLOYMENT_BUCKET || exit 1

if aws cloudformation describe-stacks --stack-name ${stackName} > /dev/null
then
  aws cloudformation update-stack \
    --stack-name ${stackName} \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=Timestamp,ParameterValue=${timestamp} \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
      ParameterKey=AllowedExtensions,ParameterValue=$ALLOWED_EXTENSIONS \
    > /dev/null || exit 1
else
  aws cloudformation create-stack \
    --stack-name ${stackName} \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=Timestamp,ParameterValue=${timestamp} \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
      ParameterKey=AllowedExtensions,ParameterValue=$ALLOWED_EXTENSIONS \
    > /dev/null || exit 1
fi

node scripts/check_deployment.js ${stackName}