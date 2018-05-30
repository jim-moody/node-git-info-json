import { write } from "./gitProperties";
const commandLineArgs = require("command-line-args");

// library's entry point
const execute = () => {
  // define allows command line arguments when calling library
  const optionDefinitions = [
    { name: "directory", alias: "d", type: String },
    { name: "filename", alias: "f", type: String },
  ];

  // convert command line arguments to object
  const options = commandLineArgs(optionDefinitions);

  // write git.properties.json file
  write(options)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
};

execute();

export default execute;
