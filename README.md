# alexa-app-template
A template for an app using alexa-app.

## Alexa Skill Philosophy

An Alexa Skill can live either on AWS Lambda or on your private server as an API endpoint. On AWS Lambda, the Skill has no access to your home network, files, physical devices, etc. You are also limited to writing in Java and Javascript. On your private server, you need to ensure the security and stability of your connection to Amazon (which is not trivial).

This template attempts to solve the problem of where to host an Alexa Skill by gaining the best of both worlds.

I propose that a Skill should be hosted on AWS Lambda and only concern itself with querying an API endpoint and formatting the response.

For anything that must reside on your home network (pysical devices, files, etc.) you can set up a server with Express, Flask, or whatever framework you are familiar with.

## Use

To get everything setup, run
``` bash
npm install 
```

Edit your alexa skill. Then, to get Intent Schema and Utterances for the registration process, run
```bash
node index.js
```

Simply zip this Skill and upload it to AWS Lambda, then register the Alexa Skill with the schema and utterances.

You are now ready to test it on your own Amazon Echo

## TODO

- [ ] Add example server in Flask and Hapi (the two I know)
- [ ] Extend the use section to cover the upload/registration process
- [ ] Explain why Lambda is great, especially for echo use
- [ ] Set up API keys in examples for private APIs at home
- [ ] Explain why the Amazon Echo is great
