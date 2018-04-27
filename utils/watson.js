const settings = require('./settings');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watson = new AssistantV1({
  version: settings.VERSION,
  username: settings.USERNAME,
  password: settings.PASSWORD,
  url: settings.ENDPOINT,
});

const MessageWatson = function(socket, data) {

  //Determine if this is the initial message or not.
  let messageData = data ?
    { workspace_id: settings.WORKSPACE_ID, input: {text: data.message}, context: data.context } :
    { workspace_id: settings.WORKSPACE_ID }

  //Send the message off to watson, if all is good, send a partial response to
  //the client
  watson.message(messageData, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      socket.emit('chatMessage', { context: res.context, msg: res.output.text });
    }
  });
}

exports.MessageWatson = MessageWatson;