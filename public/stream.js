const {createReadStream, createWriteStream} = require('fs');

//Read file contents
const readStream = createReadStream('/path/to/file');
readStream.on('data',(res)=>{
    console.log(res.toString()); // Res will be of Buffer type: https://nodejs.org/api/buffer.html#buffer
})

readStream.on('end',()=>{console.log('Stream ended')});

const writeStream = createWriteStream('/path/to/file');
writeStream.write('Some data');
writeStream.end('The writestream has ended');