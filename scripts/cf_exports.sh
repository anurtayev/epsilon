#!/bin/bash

. scripts/env.sh

export INFRASTRUCTURE_BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $PROJECT-$GIT_BRANCH-pipeline --query 'Stacks[0].Outputs[?OutputKey==`InfrastructureBucketName`].OutputValue' --output text)
