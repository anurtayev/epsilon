#!/bin/bash

. scripts/env.sh

. scripts/build_template.sh

sam deploy --template-file template.yaml \
  --stack-name $ASPAN_ENV_NAME-app \
  --capabilities CAPABILITY_IAM \
  --resolve-s3

rm schema-tabbed.graphql
# rm template.yaml