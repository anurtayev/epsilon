#!/bin/bash

. scripts/env.sh

aws s3 rm s3://$EPSILON_MEDIA_BUCKET_NAME --recursive --quiet && aws s3 rb s3://$EPSILON_MEDIA_BUCKET_NAME
