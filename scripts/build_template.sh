#!/bin/bash

cat ./node_modules/@aspan/sigma/lib/schema.graphql | sed 's/^/        /' > schema-tabbed.graphql
cat infrastructure/template-src.yaml | sed '/Definition: |/r ./schema-tabbed.graphql' > infrastructure/template.yaml
rm schema-tabbed.graphql
