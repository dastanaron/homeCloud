const WebSocket = require('ws');
const path = require('path');
const VideoScaner = require('./VideoScaner.js');

const wss = new WebSocket.Server({ port: 5000 });

const DEBUG_MODE = true;

function buildMessageForSocket(data) {
  return JSON.stringify(data);
}
function getMessageFromSocket(rawMessage) {
  return JSON.parse(rawMessage);
}

async function execCommand(object) {
  switch (object.command) {
    case 'getVideoFiles': {
      const videoFiles = await VideoScaner.getVideoFiles(object.path);
      const result = [];
      for (const videoFilePath of videoFiles) {
        const object = {
          fullPath: videoFilePath,
          pathInfo: path.parse(videoFilePath),
        };
        result.push(object);
      }
      return { status: 'ok', data: result };
    }
    default:
      return { status: 'error', message: `Undefined command ${object.command}` };
  }
}

(async () => {
  wss.on('connection', (ws, params) => {
    ws.on('message', async (message) => {
      const decodedMessage = getMessageFromSocket(message);
      try {
        const resultCommand = await execCommand(decodedMessage);
        ws.send(buildMessageForSocket(resultCommand));
      } catch (error) {
        ws.send(buildMessageForSocket({ status: 'error', message: 'undefined error', debug: DEBUG_MODE ? error : false }));
      }
      });

    ws.send(buildMessageForSocket({ status: 'Connection success', data: {} }));
  });
})();
