#!/bin/bash

. scripts/env.sh

export INFRASTRUCTURE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $ASPAN_ENV_NAME-pipeline --query 'Stacks[0].Outputs[?OutputKey==`InfrastructureBucketName`].OutputValue' --output text)
# export MEDIA_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $ASPAN_ENV_NAME-app --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)
