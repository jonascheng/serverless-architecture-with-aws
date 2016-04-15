# Serverless Architecture with AWS
Author: Jonas Cheng

***

# Background

* What does a typical 3-tier architecture look like? 
    * Building blocks: presentation tier, business logic tier, and database tier.
![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_a_simple_three-tier_application.png)

* We have to take care of scaling, caching, routing and many other tasks that add up to an team’s responsibilities.

***

# Why serverless architecture?

A new way of using serverless architecture has emerged, and **Amazon Web Services (AWS)** is taking all right steps to make serverless architecture friendlier and more powerful.

* **Operating System** - no need to select, secure, configure, administer or patch the OS.
* **Servers** - no cost risk of over-provisioning and no performance risk of under-provisioning.
* **Capacity** - no need to monitor utilization and scale capacity based on load.
* **High Availability** – compute resources are available across multiple AZs.

This is not to say that there will be no servers involved. Instead developers, and organizations building their applications with popular frameworks can now focus on their applications, not their backend.

***

# Transform from 3/N-tier

* **Presentation tier** - AWS offers S3 for static web site content, or API Gateway as front door.
* **Business logic tier** - AWS offfers Lambda.
* **Data tier** - AWS offers a variety of data store services, such as RDS, SynamoDB, ElastiCache, Redshift.

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_using_a_VPC.png)

***

# Business logic tier

***

## In a nutshell

* API Gateway
    * Provides an HTTP/S API endpoint that is fully configurable. 
    * Define the HTTP/S resources (like /user), the HTTP methods on that resources (like POST, GET, DELETE, ...) and the integration that should be called to process the request.

* Lambda
    * Run whatever logic is needed to answer the request. 
    * The result of the Lambda function is returned by the API Gateway to the caller.

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Request-Gateway-Lambda-DynamoDB-Flow.png)

***

## API Gateway & Lambda Internal

* API Gateway
    * Exposes your Lambda function at an HTTP/S endpoint.
    * Provides capabilities such as authorization, policy enforcement, rate limiting and data transformation as a service that is entirely managed by Amazon.

* Lambda
    * Ｗhere your application logic runs.
    * Deploy your code here but **NO** need to specify the number of servers or size of the servers to run the code on.
    
![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/API-Gateway-Internals.png)

***

# Presentation tier

***

* Mobile App: 
    * In addition to integrating with custom business logic via API Gateway and Lambda, you could use [Amazon Cognito](https://aws.amazon.com/cognito/)
as a mechanism to create and manage user identities.

* Static website content (such as files hosted in Amazon S3): 
    * Enable your AWS API Gateway APIs to be cross-origin resource sharing
(CORS)-compliant.
    * This allows web browsers to directly invoke your APIs from within the static web pages.

* Any other HTTPS-enabled client device: 
    * There is nothing unique or proprietary about how clients communicate with the APIs you create using
AWS API Gateway; it is pure HTTPS.

***

# Sample Architecture Patterns

***

## Mobile Backend

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_mobile_backend.png)

* **Presentation tier**: A mobile application running on each user’s smartphone.
* **Logic tier**: API Gateway and Lambda.
    * A set of Lambda functions can be specific to user/device identity management and authentication, and
managed by Cognito, which provides integration with IAM for temporary user access credentials as well as with popular third party identity providers. 
    * Other Lambda functions can define the core business logic for your mobile back end.
* **Data tier**: The various data storage services can be leveraged as needed.

***

## S3 Hosted Websites

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_a_static_website_hosted_on_Amazon_S3.png)

* **Presentation tier**: Static website content hosted in S3, distributed by CloudFront.
    * Hosting static website content on S3 is a cost-effective alternative to hosting content on server-based infrastructure.
* **Logic tier**: AWS API Gateway and AWS Lambda.
    * Static web content hosted in S3 can directly integrate with API Gateway, which can be CORS compliant.
* **Data tier**: The various data storage services can be leveraged as needed.

***

# CloudFormation - Infra-as-code

* CloudFormation gives developers an easy way to create and manage a collection of related AWS resources, provisioning and updating them in an orderly and predictable fashion.
* Applying version control to your AWS infrastructure the same way you do with your software.

***

# Why Serverless Framework?

* While Lambda offers a powerful new way of developing/running applications, when we began building first project based on Lambda, you're realized structure was badly needed.
* Managing all of the containers that Lambda introduces is a difficult task. 
* Add to that multi-developer teams, multi-stage and multi-region support and you will quickly get into a messy situation.

***

## Serverless Framework Overview

* In the form of a Node.js command line interface that provides structure, automation and optimization to help you build and maintain Serverless apps. 
* The CLI allows you to control your Lambdas, API Gateway Endpoints as well as your AWS resources via AWS CloudFormation. 

***

# First Serverless App

We’ll create a simple “Hello world” like application and look at the stuff the Serverless framework does for us behind the scenes.

***

## Prerequistions
* AWS Account
* Vagrant
* Virtual Box
* Git

## Create an Administrative IAM User.
* Login to your AWS Account and go the the **Identity & Access Management** (IAM) Page.
* Click on **Users** and then Create New Users. Enter **serverless-admin** in the first field and click **Create**.
* View and copy the Access Key ID and Secret Access Key in a safe place.
* Look for **Managed Policies** on the **Permissions** tab and click **Attach Policy**. 
* In the next screen, search for and select **AdministratorAccess** then click **Attach**.

## Development Environment
To save your time, clone materials from Github.

```
git clone https://github.com/jonascheng/serverless-architecture-with-aws.git
```

Start NodeJS development environment.

```
cd serverless-architecture-with-aws
vagrant up
vagrant ssh
```

Install Serverless Framework.

```
sudo npm install serverless -g
```

## Create a Serverless project

**cd** into the directory where you want your project to be created.

```
serverless project create
```

The Serverless CLI will ask for a few pieces of information about your project. 
Serverless uses this information to build up your stack with [CloudFormation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html).

```
Serverless: Enter a name for this project: (serverless-rkcjfc) helloworld
Serverless: Enter a new stage name for this project: (dev) jonas
Serverless: For the "jonas" stage, do you want to use an existing Amazon Web Services profile or create a new one?
    Existing Profile
  > Create A New Profile
```

Using stages is great because you can e.g. deploy your current code to the development stage and tinker around while the production stage runs the latest stable version in production.

Next up enter the ACCESS KEY ID and SECRET ACCESS KEY of our previously created serverless-admin user.

```
Serverless: Please enter the ACCESS KEY ID for your Admin AWS IAM User:
Serverless: Enter the SECRET ACCESS KEY for your Admin AWS IAM User:
Serverless: Enter the name of your new profile:  (helloworld_jonas)
```

Now we need to specify in which AWS region our code should be deployed. We’ll pick ap-northeast-1.

```
Serverless: Select a new region for your stage: 
    us-east-1
    us-west-2
    eu-west-1
    eu-central-1
  > ap-northeast-1
Serverless: Creating region "ap-northeast-1" in stage "jonas"...  
Serverless: Deploying resources to stage "jonas" in region "ap-northeast-1" via Cloudformation (~3 minutes)...  
Serverless: Successfully deployed "jonas" resources to "ap-northeast-1"  
Serverless: Successfully created region "ap-northeast-1" within stage "jonas"  
Serverless: Successfully created stage "jonas"  
Serverless: Successfully initialized project "helloworld" 
```

Great. Now Serverless does it’s thing and generates everything project related for us. Next up it sets up the used AWS resources according to the auto generated CloudFormation template.

## Project Structure

A basic Serverless project contains the following directory structure with some explanation:

```
s-project.json (project and author data)
s-resources-cf.json (CloudFormation template for all stages/regions)
admin.env (AWS Profiles - gitignored)
_meta (meta data that holds stage/regions config and variables - gitignored)
    |__resources (final CF templates for each stage/region)
         |__s-resources-cf-dev-useast1.json
    |__variables (variables specific to stages and regions)
         |__s-variables-common.json
         |__s-variables-dev.json
         |__s-variables-dev-useast1.json
```

**admin.env** only stores profile name which refers to ~/.aws/credentials.

> * What changed in CloudFormation?
> * What changed in AWS IAM?

## Create first function

**cd** into **helloworld** directory where you want your function to be created.

```
sls function create
```

Serverless asks you some questions about your function you want to create. The first thing is the name. We call it **greeter**.
After that we need to specify which runtime we want to use. We’ll pick nodejs.

```
Serverless: Enter a new function name to be created in the CWD:  greeter
Serverless: Please, select a runtime for this new Function
  > nodejs
    nodejs4.3
    python2.7
Serverless: For this new Function, would you like to create an Endpoint, Event, or just the Function?
  > Create Endpoint
    Create Event
    Just the Function...
Serverless: Successfully created function: "greeter"
```

Great. Serverless has created a new function and endpoint for us!

## Function Structure and Deployment

```
greeter (your first function)
    |__event.json (sample event for testing function locally)
    |__handler.js (your function handler file)
    |__s-function.json (data for your lambda function, endpoints and event sources)
```

Let’s test our newly created function locally before we deploy it to AWS.

```
sls function run greeter
Serverless: Running greeter...  
Serverless: -----------------  
Serverless: Success! - This Response Was Returned:  
Serverless: {
    "message": "Go Serverless! Your Lambda function executed successfully!"
}  
```

Let’s deploy our API Gateway and Lambda function. Open the deployment dashboard with the

```
sls dash deploy
Serverless: Select the assets you wish to deploy:
    greeter
      function - greeter
      endpoint - greeter - GET
    - - - - -
  > Deploy
    Cancel

Serverless: Deploying the specified functions in "jonas" to the following regions: ap-northeast-1  
Serverless: ------------------------  
Serverless: Successfully deployed the following functions in "jonas" to the following regions:   
Serverless: ap-northeast-1 ------------------------  
Serverless:   greeter (helloworld-greeter): arn:aws:lambda:ap-northeast-1:151145865037:function:helloworld-greeter:jonas  

Serverless: Deploying endpoints in "jonas" to the following regions: ap-northeast-1  
Serverless: Successfully deployed endpoints in "jonas" to the following regions:  
Serverless: ap-northeast-1 ------------------------  
Serverless:   GET - greeter - https://0ze64htj5l.execute-api.ap-northeast-1.amazonaws.com/jonas/greeter
```

Serverless will now minify, optimize and zip your Lambda function. Then they will be uploaded to the S3 bucket. An API Gateway endpoint will be created and connected to the Lambda function.

Wait until Serverless has finished and copy the generated GET URL from the terminal output. Open up a browser with this link and see how your first Lambda function is executed in the AWS cloud.

> * What changed in Lambda?
> * What changed in API Gateway?

## Create a calculator function

```
sls function create api/v1/calculator -r nodejs
Serverless: For this new Function, would you like to create an Endpoint, Event, or just the Function?
  > Create Endpoint
    Create Event
    Just the Function...
Serverless: Successfully created function: "api/v1/calculator"
```

The API expect a mathematical expressions as input parameter and response calculation result.

    POST https://[FQDN]/api/v1/calculator 
    {"me":"1+1"}
    
    Response {"result":"2"} as result

**cd** into **api/v1/calculator** directory where you want your code logic to be written.

Firstly, we leverage Math.js to evaluate a mathematical expressions instead of `eval`.

```
cp ../../../package.json .
npm install mathjs --save
```

Create **s-templates.json** with the following contents, this template is used for an endpoint's [API Gateway Mapping Template](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html). In a Serverless project, this information is specified in the **s-function.json** containing the endpoint.

```
{
  "apiGatewayRequestTemplate": {
    "application/json": {
      "httpMethod": "$context.httpMethod",
      "mathExp": "$input.params('me')"
    }
  }
}
```

Revise **s-function.json** with the following contents.

```
...
  "endpoints": [
    {
      "path": "api/v1/calculator",
      "method": "POST",
...
      "requestTemplates": "$${apiGatewayRequestTemplate}",
...

```

Code **handler.js** with the following contents.

```
'use strict';

// load math.js
var math = require('mathjs');

function calculator(event, cb) {
  console.log("mathExp: ", JSON.stringify(event.mathExp));

  if (event.httpMethod === "POST" && event.mathExp.length>0) {
    var response = {
        result: math.eval(event.mathExp)
    };

    return cb(null, response);
  }
  return cb(null, {result: 0});
};

module.exports.handler = function(event, context) {
  calculator(event, function(error, response) {
    return context.done(error, response);
  });
};
```

Modify **event.json** for local testing.

```
{
  "httpMethod": "POST",
  "mathExp": "1+2+3+4+5"  
}
```

Let’s test our calculator function locally before we deploy it to AWS.

```
sls function run calculator
Serverless: Running calculator...  
Serverless: -----------------  
Serverless: Success! - This Response Was Returned:  
Serverless: {
    "result": 15
}
```

Let’s deploy our API Gateway and Lambda function.

```
sls dash deploy
Serverless: Select the assets you wish to deploy:
    calculator
      function - calculator
      endpoint - api/v1/calculator - POST
    - - - - -
  > Deploy
    Cancel

Serverless: Deploying the specified functions in "jonas" to the following regions: ap-northeast-1  
Serverless: ------------------------  
Serverless: Successfully deployed the following functions in "jonas" to the following regions:   
Serverless: ap-northeast-1 ------------------------  
Serverless:   calculator (helloworld-calculator): arn:aws:lambda:ap-northeast-1:151145865037:function:helloworld-calculator:jonas  

Serverless: Deploying endpoints in "jonas" to the following regions: ap-northeast-1  
Serverless: Successfully deployed endpoints in "jonas" to the following regions:  
Serverless: ap-northeast-1 ------------------------  
Serverless:   POST - api/v1/calculator - https://0ze64htj5l.execute-api.ap-northeast-1.amazonaws.com/jonas/api/v1/calculator
```

***

# Take Away

* Build up server is just easy like creating a client application unless you don't know how to code.
* Of course, you still need to know the difference of architecture design between client and server application. 
* Deligate server management to AWS, and focus on business requirements.

***

# References

* [Severless Framework](https://github.com/serverless/serverless)
* [AWS Serverless Multi-Tier Architectures](https://d0.awsstatic.com/whitepapers/AWS_Serverless_Multi-Tier_Architectures.pdf)
* [Components of Amazon Serverless Architecture with Amazon API Gateway Part-1](http://cloudacademy.com/blog/components-of-amazon-serverless-architecture-with-amazon-api-gateway-part-1/)

## Serverless Examples

* [teletext.io](https://teletext.io/)
    * A serverless start-up, entirely built around AWS, but leveraging only the Amazon API Gateway, Lambda functions, DynamoDb, S3 and Cloudfront.
* [SquirrelBin](https://aws.amazon.com/blogs/compute/the-squirrelbin-architecture-a-serverless-microservice-using-aws-lambda/)
    * A Serverless Microservice Using AWS Lambda
* [dromedary-serverless](https://github.com/stelligent/dromedary-serverless)
    * This project deploys dromedary in AWS Lambda with API Gateway as the interface to demonstrate serverless architecture. 
    * It also demonstrates the use of CodePipeline with Lambdas to continuously deliver changes made in the source code in a serverless manner.