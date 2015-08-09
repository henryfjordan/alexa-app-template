# alexa-app-template
A template for an Alexa Skill using [alexa-app](http://github.com/matt-kruse/alexa-app).

## Amazon Echo

The Amazon Echo is a device sold by Amazon that is designed around voice-recognition as a service. The device can recognize verbal commands and read a response aloud. While it's functionality is currently limited, Amazon allows developers to add functions called Alexa Skills. This repo is an example of how to set up your own Alexa Skills.

You can buy an Echo at [Amazon](http://www.amazon.com/Amazon-SK705DI-Echo/dp/B00X4WHP5E/).

You can see the official Alexa Skills documentation [here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit).

## Alexa Skill Philosophy

An Alexa Skill can live either on [AWS Lambda](https://console.aws.amazon.com/lambda/home) or on your server as an API endpoint. On AWS Lambda, the Alexa Skill has a quick, secure connection to Amazon but it has no access to your home network, files, physical devices, etc. You are also limited to writing in Java and Javascript. On your private server, you need to ensure the security and stability of your connection to Amazon (which is not trivial) but you have the freedom to construct your Alexa Skill in whatever language/framework you choose.

This template attempts to answer the question of where to host an Alexa Skill by taking the best of both worlds.

I propose that all of your Alexa Skills should be hosted on AWS Lambda and only concern themselves with querying an API endpoint and formatting the response. This way, all of your Alexa Skills will be relatively similar, regardless of whether they poll your own services or an API served by a third-party.

For anything that tracks a state or must reside on your own network (pysical devices, files, databases, etc.) you can set up a server with Express, Flask, or whatever framework you are familiar with. These things should all be exposed by an API for security and stability.

## Setup

To get everything setup, first clone the  git repository:
```bash
git clone https://github.com/henryfjordan/alexa-app-template.git
cd alexa-app-template
```

### Lambda

[AWS Lambda](https://console.aws.amazon.com/lambda/home) is a service that runs a function when it is called, as opposed to the standard method of running a server 24/7.

Start by installing the Lambda function's dependencies
```bash
cd lamba && npm install
```

Edit your [Alexa Skill](http://github.com/matt-kruse/alexa-app). Then compress the code into a zip file. You need to compress the contents of the lambda folder, including `node_modules` but not the lambda folder itself
```bash
zip -X -r Archive.zip .
```

Upload this file to Lambda and set `Event source type` to `Alexa Skill Kit`. You can test the skill using the `sample_event.json` file.

Now, go to [Alexa Skills Developer Portal](https://developer.amazon.com/edw/home.html#/skills) and register your skill. Give the skill a good invocation name and link it back to your Lamba skill. To get the Intent Schema and Utterances for the registration process, run
```bash
node index.js
```

Lastly, enable the app for testing.

You are now ready to use the Alexa Skill on your own Amazon Echo. Of course, you'll run into errors because the server is not configured yet.

You will probably want to head back to the root of the project directory
```bash
cd ..
```

### Server

You can build your server however you like. In this template, I've used Hapi because I like the way it uses objects to configure the routes, which I believe lends itself well to an example server.

To configure the example server, enter the server directory and install the dependencies
```bash
cd server && npm install
```

Then you'll want to configure your web server. I use [Nginx](http://www.nginx.com). You can add the following to the `server` block in the nginx.conf file or configure your own web server
```nginx
location /alexa {
    proxy_pass http://127.0.0.1:8012;
}
```

You are now ready to run your server
```bash
node index.js
```

I've included an initscript that's been tailored for Gentoo if you'd like to run your server on startup.

At this point, you should be able to use your Alexa Skill on your own Amazon Echo. Amazon will begin allowing developers to release skills to the public at some point in the future.

## TODO

- [ ] Set up API keys in examples for private APIs at home
- [ ] Error handling
- [ ] Add list of example skills derived from this template
