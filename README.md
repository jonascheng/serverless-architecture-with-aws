# Serverless Architecture with AWS
Author: Jonas Cheng

***

# Background

* What does a typical 3-tier architecture look like? 
    * Building blocks: a presentation layer, business logic layer, and database layer.
![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_a_simple_three-tier_application.png)
* To make things more complicated, we have to take care of auto-scaling, caching, routing and many other tasks that add up to an organizations’ responsibilities.
* A new way of using serverless architecture has emerged, and Amazon Web Services (AWS) is taking all right steps to make serverless architecture friendlier and more powerful.

***

# Why serverless architecture?

* No operating systems to choose, secure, patch, or manage.
    * Servers require frequent refreshing with software to keep them up-to-date and bug-free.
* No servers to right size, monitor, or scale out.
* No risk to your cost by over-provisioning.
    * A minimum number of servers are required to run the services to achieve HA.
* No risk to your performance by under-provisioning.
* This is not to say that there will be **no** servers involved. Users, developers, and organizations building their applications with popular frameworks can now focus on their applications, not their backend.

***

# A transformation from 3-tier or N-tier

To simplify the introduction, the introduction doesn't address authentication, authorization, networking and monitoring.

* Presentation tier
    * AWS offers S3
* Business logic tier
    * AWS offfers API Gateway, and Lambda
* Data tier
    * AWS offers a variety of data store services, such as: RDS, SynamoDB, ElastiCache, Redshift.
![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_using_a_VPC.png)

***

# Business logic tier

***

# What's AWS API Gateway

* A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.
* Handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, authorization and access control, monitoring, and API version management.
* You can create an API that acts as a “front door” for applications to access data, business logic, or functionality from your back-end services.
* You only pay when your APIs are in use and for the API calls you receive and the amount of data transferred out.

***

# What's AWS Lambda

* Allows arbitrary code written in any of the supported languages, NodeJS, JVM based, and Python to be triggered in response to an event.
* Event can be one of serveral programmatic triggers that WS makes available, called an **[event source](http://docs.aws.amazon.com/lambda/latest/dg/intro-core-components.html#intro-core-components-event-sources)**.
* AWS Lambda function can exist within the context of a typical web service, and it can be triggered
directly by an HTTPS request. 
    * Amazon API Gateway acts as the front door for your logic tier, you need to execute the logic behind those APIs.
* You are charged based on the number of requests for your functions and the time your code executes. 

***

# Presentation tier

* Mobile App: 
    * In addition to integrating with custom business logic via
AWS API Gateway and AWS Lambda, you could use [Amazon Cognito](https://aws.amazon.com/cognito/)
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

# Mobile Backend

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_mobile_backend.png)

* Presentation tier: A mobile application running on each user’s smartphone.
* Logic tier: AWS API Gateway and AWS Lambda.
    * The logic tier is globally distributed by the CloudFront distribution created as part
of each AWS API Gateway API.
    * A set of Lambda functions can be specific to user/device identity management and authentication, and
managed by Cognito, which provides integration with IAM for temporary user access credentials as well as with popular third party identity providers. 
    * Other Lambda functions can define the core business logic for your mobile back end.
* Data tier: The various data storage services can be leveraged as needed.

***

# Amazon S3 Hosted Website

![](https://raw.githubusercontent.com/jonascheng/serverless-architecture-with-aws/master/img/Architectural_pattern_for_a_static_website_hosted_on_Amazon_S3.png)

* Presentation tier: Static website content hosted in S3, distributed by CloudFront.
    * Hosting static website content on S3 is a cost-effective alternative to hosting content on server-based infrastructure.
    * However, for a website to contain rich features, the static content often must integrate with a dynamic backend.
* Logic tier: AWS API Gateway and AWS Lambda.
    * Static web content hosted in S3 can directly integrate with API Gateway, which can be CORS compliant.
* Data tier: The various data storage services can be leveraged as needed.

***

# Take Away

* The multi-tier architecture pattern encourages the best practice of creating application components that are easy to maintain, decoupled, and scalable. 
* When you create a logic tier where integration occurs via API Gateway and computation occurs within Lambda, you are on your way to realizing those goals while reducing the amount of effort to achieve them. 
* These services provide a HTTPS API front end for your clients and a secure environment within your VPC to execute business logic. 
* This allows you to take advantage of many popular scenarios in which you can use these managed services instead of managing typical server-based infrastructure yourself.

***

# Backup Slides

***

# AWS API Gateway Pricing

* Only pay when your APIs are in use. There are no minimum fees or upfront commitments.
* Only pay for the API calls you receive and the amount of data transferred out. 
* Also provides optional data caching charged at an hourly rate that varies based on the cache size you select.
* $4.25 per million API calls received, plus the cost of data transfer out, in gigabytes. (Tokyo)
* Data-Transfer-Out Rates: $0.14/GB for the first 10 TB

> [more details...](https://aws.amazon.com/api-gateway/pricing/?nc1=h_ls)
> 

***

# References

* [AWS Serverless Multi-Tier Architectures](https://d0.awsstatic.com/whitepapers/AWS_Serverless_Multi-Tier_Architectures.pdf)
* [Components of Amazon Serverless Architecture with Amazon API Gateway Part-1](http://cloudacademy.com/blog/components-of-amazon-serverless-architecture-with-amazon-api-gateway-part-1/)
