# alexa-app-template
A template for an Alexa Skill using [alexa-app](http://github.com/matt-kruse/alexa-app).

## Amazon Echo

The Amazon Echo is a device sold by Amazon that offers voice-recognition as a service. The device can recognize verbal commands and respond. While it's skillset is currently limited, Amazon allows developers to add functionality called Skills. This repo is an example of how to set up your own Alexa Skills.

## Alexa Skill Philosophy

An Alexa Skill can live either on AWS Lambda or on your private server as an API endpoint. On AWS Lambda, the Skill has no access to your home network, files, physical devices, etc. You are also limited to writing in Java and Javascript. On your private server, you need to ensure the security and stability of your connection to Amazon (which is not trivial).

This template attempts to solve the problem of where to host an Alexa Skill by gaining the best of both worlds.

I propose that a Skill should be hosted on AWS Lambda and only concern itself with querying an API endpoint and formatting the response.

For anything that tracks a state or must reside on your own network (pysical devices, files, databases, etc.) you can set up a server with Express, Flask, or whatever framework you are familiar with. These things should all be exposed by an API for security.

## Use

To get everything setup, first clone the  git repository:
```bash
git clone https://github.com/henryfjordan/alexa-app-template.git
```

Edit your alexa skill. Then, to get Intent Schema and Utterances for the registration process, run
```bash
node index.js
```

Simply zip this Skill and upload it to AWS Lambda, then register the Alexa Skill with the schema and utterances.

You are now ready to test it on your own Amazon Echo

## TODO

- [X] Add example server in Hapi
- [ ] Extend the use section to cover the upload/registration process
- [ ] Explain why Lambda is great, especially for echo use
- [ ] Set up API keys in examples for private APIs at home
- [ ] Explain why the Amazon Echo is great
