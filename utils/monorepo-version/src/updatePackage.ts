import * as fs from 'fs';
import * as path from 'path';
import prettier from 'prettier';

const updatePackage = (dir: string, version: string) => {
  const file = path.join(dir, 'package.json');
  let packages = JSON.parse(fs.readFileSync(file) as any);
  packages.version = version;
  for (const dependency in packages.dependencies) {
    if (dependency.includes('onehook')) {
      packages.dependencies[dependency] = version;
    }
  }

  fs.writeFileSync(
    file,
    prettier.format(JSON.stringify(packages), { parser: 'json', singleQuote: true, tabWidth: 2, printWidth: 120 })
  );
};

export default updatePackage;
