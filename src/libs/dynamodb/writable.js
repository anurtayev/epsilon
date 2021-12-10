const { Writable } = require("stream");
const { batchWrite } = require("./batchWrite");

const MAX_BUFFER_SIZE = 25;

const dynamodbWritable = new Writable({
  objectMode: true,
  construct(callback) {
    this.buffer = [];
    callback();
  },
  write(chunk, encoding, callback) {
    console.log(chunk);
    this.buffer.push(chunk);

    if (this.buffer.length === MAX_BUFFER_SIZE) {
      batchWrite(this.buffer);
      this.buffer = [];
    }
    callback();
  },
  destroy() {
    if (this.buffer.length > 0) {
      batchWrite(this.buffer);
    }
    this.buffer = null;
  },
});

module.exports = { dynamodbWritable };
