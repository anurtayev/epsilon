#!/bin/bash

UUID=$(node -e "const {v4} = require('uuid'); console.log(v4())")

cat auth/verifyToken-src.js | sed 's/CUSTOM_CLAIM_VALUE = "";/CUSTOM_CLAIM_VALUE = "'$UUID'";/' > auth/verifyToken.js

cat ./node_modules/@aspan/sigma/lib/schema.graphql | sed 's/^/        /' > schema-tabbed.graphql
cat infrastructure/template-src.yaml | sed '/Definition: |/r ./schema-tabbed.graphql' | sed 's/aspan_custom_claim: ""/aspan_custom_claim: "'$UUID'"/' > infrastructure/template.yaml
rm schema-tabbed.graphql
