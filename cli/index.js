require("dotenv-safe").config();

const { program } = require("commander");

program.addCommand(require("./walkers/walkS3"));
program.addCommand(require("./walkers/walkDisk"));

program.parseAsync(process.argv);
