import type { AWS } from "@serverless/typescript";

import oracle from "@lambdas/oracle";

const serverlessConfiguration: AWS = {
  service: "epsilon",
  frameworkVersion: "2",
  useDotenv: true,
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: [
              "arn:aws:s3:::nurtai-pics-test/*",
              "arn:aws:s3:::nurtai-pics-test",
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { oracle },
  package: { individually: true, patterns: ["src/**"] },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
