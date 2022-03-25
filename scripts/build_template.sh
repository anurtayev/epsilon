#!/bin/bash

. scripts/env.sh

cat schema.graphql | sed 's/^/        /' > schema-tabbed.graphql
cat template-src.yaml | sed '/Definition: |/r ./schema-tabbed.graphql' > template.yaml
