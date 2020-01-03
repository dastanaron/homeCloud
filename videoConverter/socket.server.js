const WebSocket = require('ws');
const VideoScaner = require('./VideoScaner.js');

const wss = new WebSocket.Server({ port: 5000 });

const DEBUG_MODE = true;

(async () => {
	wss.on('connection', (ws, params) => {

	  ws.on('message', async (message) => {
	  	const decodedMessage = getMessageFromSocket(message);
	  	try {
	  		let resultCommand = await execCommand(decodedMessage);
	  		ws.send(buildMessageForSocket(resultCommand));
	  	} catch(error) {
	  		ws.send(buildMessageForSocket({status: 'error', message: 'undefined error', debug: DEBUG_MODE ? error : false}));
	  	}
	  	
	  })

	  ws.send(buildMessageForSocket({status: 'Connection success', data: {}}));
	});
})();


function buildMessageForSocket(data) {
	return JSON.stringify(data);
}
function getMessageFromSocket(rawMessage) {
	return JSON.parse(rawMessage);
}

async function execCommand(object) {
	switch (object.command) {
		case 'getVideoFiles':
			const videoFiles = await VideoScaner.getVideoFiles(object.path);
			return {status: 'ok', data: videoFiles}
		default:
			return {status: 'error', message: `Undefined command ${object.command}`}
	}
}