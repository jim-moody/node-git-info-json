import fs from "fs";
import {
  getBranch,
  getCommitId,
  getCommitUserName,
  getCommitUserEmail,
  getCommitMessageFull,
  getCommitMessageShort,
  getCommitTime
} from "./gitCommands";

/**
 * @param destinationPath   Directory to save git.properties file to (directory must already exist).
 * @param callback  Function to call when git.properties file has been written or when an error doing so occurs.
 */

export const write = ({directory, filename, extra}) => {
  return new Promise((resolve, reject) => {
    filename = filename || 'git.properties.json'; 
    const destinationPath = directory || process.cwd(); // default location for saving the git.properties file

    let extraData = {}

    try {
      extraData = JSON.parse(extra);
    } catch(e) {
      console.log('error', extra);
    }

    // will be the current working directory of the Node.js process.

    const gitPromises = [
      getBranch(),
      getCommitId(),
      getCommitUserName(),
      getCommitUserEmail(),
      getCommitMessageFull(),
      getCommitMessageShort(),
      getCommitTime()
    ];

    Promise.all(gitPromises).then(
      ([
        branch,
        commitId,
        commitUserName,
        commitUserEmail,
        commitMessageFull,
        commitMessageShort,
        commitTime
      ]) => {
        const gitProperties = {
          ...extraData,
          buildTime: new Date().toUTCString(),
          git: {
            commit: {
              message: {
                full: commitMessageFull.replace(/(?:\r\n|\r|\n)/g, "\\n"),
                short: commitMessageShort
              },
              time: commitTime,
              id: commitId,
              abbrevId: commitId.substring(0, 7),
              user: {
                email: commitUserEmail,
                name: commitUserName
              }
            },
            branch: branch
          }
        };

        const gitPropertiesFormatted = JSON.stringify(gitProperties, null, 2); //returnInfo.join(''); // format git properties for marshalling to file

        const destinationPathCleaned = destinationPath.replace(/\/?$/, "/"); // make sure destination path ends
        // with '/'

        // Generate git.properties.json file
        fs.writeFile(
          destinationPathCleaned + filename,
          gitPropertiesFormatted,
          err => {
            if (err) {
              // error has occured saving git.properties
              console.log(
                "[node-git-info][ERROR]: can't create " + filename + " file."
              );
              reject();
            } else {
              // saving git.properties was a success
              console.log(
                "[node-git-info] " + filename + " has successfully created."
              );
              resolve();
            }
          }
        );
      }
    );
  });
};
