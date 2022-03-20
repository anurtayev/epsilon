#!/bin/bash

. scripts/env.sh

cat schema.graphql | sed 's/^/        /' > schema-tabbed.graphql
cat template-src.yaml | sed '/Definition: |/r ./schema-tabbed.graphql' > template.yaml

sam deploy --template-file template.yaml \
  --stack-name $ASPAN_ENV_NAME-app \
  --capabilities CAPABILITY_IAM \
  --resolve-s3

rm schema-tabbed.graphql
# rm template.yaml