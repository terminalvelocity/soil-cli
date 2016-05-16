import pkg from '../../../package.json';

export default async function version(cli) {
  cli.ui(pkg.version);
};
