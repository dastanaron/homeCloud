const VideoScaner = require('./VideoScaner.js');
const VideoConverter = require('./VideoConverter.js');
const fs = require('fs');

const arguments = process.argv.slice(2);
if (arguments.length < 2) {
    throw new Error('Must be required arguments: input and output paths');
}

(async () => {

    if (!fs.existsSync(arguments[0])) {
        throw new Error('Undefined path');
    }

	let videoFiles = await VideoScaner.getVideoFiles(arguments[0])

	for (let videoFile of videoFiles) {
        //todo: добавить нарезку кадра для превью
        try {
            let subprocess = VideoConverter.convertToBrowserSupportedFormat(videoFile, arguments[1]);
            subprocess.on('close', (code) => {
              if (code !== 0) {
                console.log(`This convertation has been failed with code ${code}. Command: |${subprocess.spawnargs[2]}|`);
              } else {
                console.log(`The file ${videoFile} close code: ${code}`);
              }
            })
        } catch(e) {
            console.error(e);
        }
    }
})();
