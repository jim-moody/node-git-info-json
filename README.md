# Node Git Info JSON

Basically a fork from the [node-git-info](https://www.npmjs.com/package/node-git-info) project but the output is a `.json` file instead of a `.properties` file which is much easier to parse in a Node project.

## Usage

### Globally

```sh
npm i -g node-git-info-json
node-git-info-json [options]

-d, --directory # Directory to save the file to, default is the cwd
```

### Locally

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
