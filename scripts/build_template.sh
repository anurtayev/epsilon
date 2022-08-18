#!/bin/bash

ISS=$(aws cloudformation list-exports --query 'Exports[?Name==`CognitoUserPoolProviderURL`].Value | [0]')
echo $ISS
cat auth/verifyToken-src.js | sed 's%ASPAN_ISS = "";%ASPAN_ISS = '$ISS';%' > auth/verifyToken.js

cat ./node_modules/@aspan/sigma/lib/schema.graphql | sed 's/^/        /' > schema-tabbed.graphql
cat infrastructure/template-src.yaml | sed '/Definition: |/r ./schema-tabbed.graphql' > infrastructure/template.yaml
rm schema-tabbed.graphql
