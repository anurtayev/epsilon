#!/bin/bash

. scripts/env.sh

rm -rf dependencies
mkdir -p dependencies/nodejs
cp package.json package-lock.json dependencies/nodejs
cd dependencies/nodejs
npm install --production
rm package.json package-lock.json