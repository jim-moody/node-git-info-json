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

export const write = destinationPath => {
  return new Promise((resolve, reject) => {
    destinationPath = destinationPath || process.cwd(); // default location for saving the git.properties file
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
          destinationPathCleaned + "git.properties.json",
          gitPropertiesFormatted,
          err => {
            if (err) {
              // error has occured saving git.properties
              console.log(
                "[node-git-info][ERROR]: can't create git.properties.json file."
              );
              reject();
            } else {
              // saving git.properties was a success
              console.log(
                "[node-git-info] git.properties.json has successfully created."
              );
              resolve();
            }
          }
        );
      }
    );
  });
};
