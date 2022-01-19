#!/bin/bash

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

timestamp=$(date +%Y%m%d%H%M%S)
echo "Timestamp: $timestamp"
stackName=${PROJECT}-${NODE_ENV}
echo "StackName: $stackName"

aws cloudformation delete-stack --stack-name ${stackName} > /dev/null
while aws cloudformation describe-stacks --stack-name ${stackName} > /dev/null
do
  sleep 2
  printf "."
done
printf "\n$stackName has been deleted"
aws s3 rb s3://$stackName-media --force
printf "\nBucket $stackName-media has been deleted"
