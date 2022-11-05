import getConfig from './getConfig';
import getNextVersion from './getNextVersion';
import updatePackage from './updatePackage';
import visitWorspace from './visitWorspace';

export const version = async () => {
  const [mode] = process.argv.slice(2);
  const { version, workspaces } = getConfig();
  const nextVersion = getNextVersion(version, mode) || version;
  updatePackage('.', nextVersion);
  for (const workspace of workspaces) {
    visitWorspace(workspace, nextVersion);
  }
};
