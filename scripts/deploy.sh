#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi


rm -rf build
rm -rf deploy
tsc || exit 1
docker build -t epsilon-deploy .
docker cp $(docker create --rm epsilon-deploy):/app/node_modules build/node_modules
mkdir deploy
zip deploy/$PROJECT-$NODE_ENV.zip build/* -r -q

aws s3 sync cloudformation s3://$S3_DEPLOYMENT_BUCKET/cloudformation || exit 1
#aws s3 sync deploy s3://$S3_DEPLOYMENT_BUCKET || exit 1

aws cloudformation validate-template \
  --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
  || exit 1

if aws cloudformation describe-stacks --stack-name $PROJECT-$NODE_ENV
then
  aws cloudformation update-stack \
    --stack-name $PROJECT-$NODE_ENV \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=ProjectName,ParameterValue=$PROJECT \
      ParameterKey=Environment,ParameterValue=$NODE_ENV \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
  || exit 1
else
  aws cloudformation create-stack \
    --stack-name $PROJECT-$NODE_ENV \
    --template-url https://$S3_DEPLOYMENT_BUCKET.s3.amazonaws.com/cloudformation/appsync.yml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters \
      ParameterKey=ProjectName,ParameterValue=$PROJECT \
      ParameterKey=Environment,ParameterValue=$NODE_ENV \
      ParameterKey=DeploymentBucketName,ParameterValue=$S3_DEPLOYMENT_BUCKET \
  || exit 1
fi

    