const WebSocket = require('ws');

let socket = new WebSocket(`ws://localhost:5000`);

socket.onopen = (event) => {
	socket.send(JSON.stringify({command: 'getVideoFiles', path: '/home/dastanaron/Видео'}));
};

socket.onmessage = function(event) {
	const decodedMessage = JSON.parse(event.data);
	console.log(decodedMessage);
};

socket.onclose = function(event) {
  if (event.wasClean) {
	console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
	// например, сервер убил процесс или сеть недоступна
	// обычно в этом случае event.code 1006
	console.log('[close] Соединение прервано');
  }
  process.exit(1);
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`, error);
};
