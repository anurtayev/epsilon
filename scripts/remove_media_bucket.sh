#!/bin/bash

. scripts/env.sh

aws s3 rm \
    s3://$(aws cloudformation describe-stacks --stack-name $ASPAN_APP_STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`MediaBucketName`].OutputValue | [0]' --output text) \
    --recursive --quiet \
    && aws s3 rb \
    s3://$(aws cloudformation describe-stacks --stack-name $ASPAN_APP_STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`MediaBucketName`].OutputValue | [0]' --output text) \
