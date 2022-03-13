#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
export ASPAN_AWS_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
export ASPAN_ENV_NAME=$PROJECT-$GIT_BRANCH-$ASPAN_AWS_ACCOUNT-$AWS_DEFAULT_REGION
