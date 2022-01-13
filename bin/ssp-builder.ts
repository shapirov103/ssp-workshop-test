import { App } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import { TeamPlatform } from '../teams';
import { TeamAwesome } from '../teams/application-team/index';

const app = new App();


const account = process.env.CDK_DEFAULT_ACCOUNT!;
const region = process.env.CDK_DEFAULT_REGION;
const env = { account, region };
const blueprint = ssp.EksBlueprint.builder()
    .account(account) 
    .region('us-west-2')
    .addOns(
    // supply other necessary add-ons
    )
    .teams(new TeamPlatform(account), new TeamAwesome('application'));
    
      
  // Build code pipeline and add stages
ssp.CodePipelineStack.builder()
  .name("ssp-eks-workshop-pipeline")
  .owner("parkand1")
  .repository({
      repoUrl: 'ssp-workshop-test',
      credentialsSecretName: 'github-token',
      targetRevision: 'main'
  })
  .stage({
      id: 'dev',
      stackBuilder: blueprint.clone('us-west-1')
  })
  .stage({
      id: 'test',
      stackBuilder: blueprint.clone('us-east-1')
  })
  .stage({
      id: 'prod',
      stackBuilder: blueprint.clone('us-east-2')
  })
  .build(app, 'my-first-blueprint', {env});
