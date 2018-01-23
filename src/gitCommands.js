import cpp from "child-process-promise";
const { exec } = cpp;

const trim = result => result.stdout.trim();

export const getBranch = () =>
  exec('git symbolic-ref HEAD | sed -e "s/refs\\/heads\\//"/').then(trim);

export const getCommitId = () => exec("git rev-parse HEAD").then(trim);

export const getCommitUserName = () =>
  exec("git log -1 --pretty=format:%an").then(trim);

export const getCommitUserEmail = () =>
  exec("git log -1 --pretty=format:%ae").then(trim);

export const getCommitMessageFull = () =>
  exec("git log -1 --pretty=format:%B").then(trim);

export const getCommitMessageShort = () =>
  exec("git log -1 --pretty=format:%s").then(trim);

export const getCommitTime = () =>
  exec("git log -1 --pretty=format:%ct")
    .then(trim)
    .then(output => new Date(output * 1000).toString());
