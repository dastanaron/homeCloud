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

        let isConverted = false;

        try {
            converted = await VideoConverter.convertToBrowserSupportedFormat(videoFile, arguments[1]);
        } catch(e) {
            console.error(e);
        }
        
        console.log(`converting file ${videoFile} result: ${converted}`);
    }
})();
