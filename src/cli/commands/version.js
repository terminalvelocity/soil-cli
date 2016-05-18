export default async function version(cli) {
  const { pkg, ui, exit } = cli;

  ui(pkg.version);
  exit();
};
