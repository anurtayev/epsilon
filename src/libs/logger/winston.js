const { createLogger, format, transports } = require("winston");

const customFormatter = format((info) => {
  info[Symbol.for("message")] = JSON.stringify(info.message, null, 2);
  return info;
});

const logger = createLogger({
  format: customFormatter(),
  transports: [new transports.Console()],
});

module.exports = { logger };
