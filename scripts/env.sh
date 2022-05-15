#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
export ASPAN_AWS_ACCOUNT=$(aws sts get-caller-identity --query 'Account' --output text)
export ASPAN_ENV_NAME=$PROJECT-$GIT_BRANCH-$ASPAN_AWS_ACCOUNT-$AWS_DEFAULT_REGION
export ASPAN_APP_STACK_NAME=$ASPAN_ENV_NAME-app
export ASPAN_FE_STACK_NAME=$PROJECT_FE-$GIT_BRANCH-$ASPAN_AWS_ACCOUNT-$AWS_DEFAULT_REGION
export EPSILON_MEDIA_BUCKET_NAME=$ASPAN_APP_STACK_NAME-media-bucket
export WEBSITE_HOSTING_BUCKET_NAME=$ASPAN_APP_STACK_NAME-website-bucket