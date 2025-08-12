#!/usr/bin/env node
import "source-map-support/register";
import { ServerStack } from "../lib/server.stack";
import { App, StackProps, Tags } from "aws-cdk-lib";

const {
  CDK_ENV: environmentName = "prod",
  CDK_DEFAULT_ACCOUNT,
  AWS_DEFAULT_ACCOUNT_ID,
  CDK_DEFAULT_REGION,
  AWS_DEFAULT_REGION,
} = process.env;

const account = CDK_DEFAULT_ACCOUNT || AWS_DEFAULT_ACCOUNT_ID;
const region = CDK_DEFAULT_REGION || AWS_DEFAULT_REGION;

const serviceName = "gamesetbook";
const stackId = `${serviceName}-${environmentName}`;

const app = new App();

const serverStackProps: StackProps = {
  description: `Summary: This stack deploys the GameSetBook Server resources.`,
  env: {
    account,
    region,
  },
};

const serverStack = new ServerStack(app, stackId, {
  ...serverStackProps,
  environmentName,
  serviceName,
});

Tags.of(serverStack).add("application", serviceName);
Tags.of(serverStack).add("stack", stackId);
Tags.of(serverStack).add("environmentName", environmentName);
