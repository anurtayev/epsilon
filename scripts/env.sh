#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

export GIT_BRANCH=$(git status|head -n 1|cut -d ' ' -f3)
export ENV_NAME=$PROJECT-$GIT_BRANCH
