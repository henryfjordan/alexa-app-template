var alexa = require('alexa-app');
var httpRequest = require('request');

// Make an app instance
var app = new alexa.app();

// Launch runs when a user queries the skill without an intent
app.launch(function(request, response) {
    httpRequest.get(
        {
            // Change me to your server URL
            url: "http://example.com/alexa",
        },
        function(err, httpResponse, body){
            response.say(decodeURI(body));
            response.card("Example", decodeURI(body));
            response.send();
        }
    );

    return false;
});

// An intent
app.intent('ExampleIntent',
  {
    "slots":{"NAME":"LITERAL"},
        "utterances":[ "my {name is|name's} {name|NAME}"]
  },
  function(request, response) {

        var name = request.slot('NAME');

        httpRequest.get(
            {
                // change me to your server URL
                url: "http://example.com/alexa/" + encodeURIComponent(name),
            },
            function(err, httpResponse, body){
                response.say(decodeURI(body));
                response.card("Example", decodeURI(body));
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

console.log("Schema: \n" + app.schema() + "\n")
console.log("Utterances: \n" + app.utterances())
