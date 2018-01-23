# Node Git Info JSON

This module outputs a `git.properties.json` file with some [git commit information](#sample-output).

It was created because we created a Node Express app with a `/info` endpoint that serves some git information.

## Usage

### Globally

```sh
npm i -g node-git-info-json
node-git-info-json [options]

-d, --directory # Directory to save the file to, default is the cwd
```

### Project Level

1. Install as dev dependency

```sh
npm i -D node-git-info-json
```

2. Add to `package.json` scripts, example below:

```json
{
  "scripts": {
    "git-info": "node-git-info-json"
  }
}
```

3. Run script as part of npm command

```sh
npm run git-info
```

## Sample Output

`git.properties.json`

```json
{
  "git": {
    "commit": {
      "message": {
        "full": "fake commit",
        "short": "fake commit"
      },
      "time": "Tue Jan 23 2018 15:46:45 GMT-0500 (EST)",
      "id": "af1fe75e2df23d1e93e884c6018d6f23dfee19c4",
      "abbrevId": "af1fe75",
      "user": {
        "email": "jimsmoody@gmail.com",
        "name": "JIM MOODY"
      }
    },
    "branch": "master"
  }
}
```

## Acknowledgements

Basically a fork from the [node-git-info](https://www.npmjs.com/package/node-git-info) project but the output is a `.json` file instead of a `.properties` file which is much easier to parse in a Node project.
