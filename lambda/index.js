var alexa = require('alexa-app');
var request_lib = require('request');
var striptags = require('striptags');

// Make an app instance
var app = new alexa.app();

// Launch runs when a user queries the skill without an intent
app.launch(function(request,response) {
	response.say("I can poll an API and then format and read the response. Right now I am an example")
});

// An intent
app.intent('ExampleIntent',
  {
    "slots":{}
    ,"utterances":[ "{try|test} me out", "run a test" ]
  },
  function(request,response) {
		request_lib.get(
			{
				url: 'http://example.com/alexa/',
			},
			function(err, httpResponse, body){
				response.say(body);
				response.card("Example", body);
				response.send();
		 	}
		);

		return false;
  }
);

// sessionEnded runs when a sessions ends
app.sessionEnded(function(request,response) {
		// Here is where you might clean up user information or logout of a service
});

// Connect to lambda
exports.handler = app.lambda();

console.log(app.schema())
console.log(app.utterances())
