import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export type Environment = "dev" | "prod" | "staging" | "test" | string;

export interface ServerStackProps extends StackProps {
  environmentName: Environment;
  serviceName: string;
}

export class ServerStack extends Stack {
  public readonly id: string;
  public readonly environmentName: Environment;
  public readonly serviceName: string;

  constructor(scope: Construct, id: string, props: ServerStackProps) {
    super(scope, id, props);

    this.id = id;
    this.environmentName = props.environmentName;
    this.serviceName = props.serviceName;

    // example resource

    const vpc = new Vpc(this, `${this.id}-vpc`, {
      maxAzs: 2, // Limits to 2 availability zones for cost-effectiveness
    });
  }
}
