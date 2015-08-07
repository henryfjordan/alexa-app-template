var alexa = require('alexa-app');
var request_lib = require('request');
var striptags = require('striptags');

// Make an app instance
var app = new alexa.app();

// Launch runs when a user queries the skill without an intent
app.launch(function(request,response) {
	response.say("I can poll an API and then format and read the response. Right now I go find a random quote on design")
});

// An intent
app.intent('QuoteIntent',
  {
    "slots":{}
    ,"utterances":[ "{try|test} me out", "run a test" ]
  },
  function(request,response) {
		request_lib.get(
			{
				url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
			},
			function(err, httpResponse, body){
				quote = striptags(JSON.parse(body)[0].content);
				response.say(quote);
				response.card("Quote", quote);
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
