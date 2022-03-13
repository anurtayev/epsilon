#!/bin/bash

. scripts/cf_exports.sh

timestamp=$(date +%Y%m%d%H%M%S)
newSchemaName=schema_${timestamp}.graphql

aws s3 cp schema.graphql s3://$INFRASTRUCTURE_BUCKET_NAME
aws s3 mv s3://$INFRASTRUCTURE_BUCKET_NAME/schema.graphql s3://$INFRASTRUCTURE_BUCKET_NAME/$newSchemaName
sam deploy --template-file template.yaml \
  --stack-name $ASPAN_ENV_NAME-app \
  --parameter-overrides ParameterKey=SchemaURI,ParameterValue=s3://$INFRASTRUCTURE_BUCKET_NAME/$newSchemaName \
  --capabilities CAPABILITY_IAM \
  --region us-east-1 \
  --s3-bucket $INFRASTRUCTURE_BUCKET_NAME 
