# Node Git Info JSON With Extra

This module outputs a `git.properties.json` file with some [git commit information](#sample-output).

It was created because we created a Node Express app with a `/info` endpoint that serves some git information.

## Usage

### Globally

```sh
npm i -g node-git-info-json-extra
node-git-info-json-extra [options]

-d, --directory # Directory to save the file to, default is the cwd
-f, --filename # Filename, default is git.properties.json
-e, --extra # Extra json to append to the generated file
```

### Project Level

1. Install as dev dependency

```sh
npm i -D node-git-info-json-extra
```

2. Add to `package.json` scripts, example below:

```json
{
  "scripts": {
    "git-info": "node-git-info-json-extra"
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
  "buildTime": "Wed, 30 May 2018 09:54:53 GMT",
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

## Full example

```sh
mkdir dist
npx node-git-info-json-extra -d dist -f info.json -e '{"version": "1.2.3"}'
```

## Full Sample Output

`git.properties.json`

```json
{
  "version" : "1.2.3",
  "buildTime": "Wed, 30 May 2018 09:54:53 GMT",
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
