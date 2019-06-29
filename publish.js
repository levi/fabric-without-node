const { execSync } = require('child_process');
const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

// execSync('git clone git@github.com:fabricjs/fabric.js.git fabric-repository');
const { name, description } = require('./package.json');
const fabricPkg = require('./fabric-repository/package.json');
const readmePath = path.resolve(__dirname, 'fabric-repository/README.md');
const fabricReadme = readFileSync(readmePath);
console.log('that\'s the latest build');
writeFileSync(
  path.resolve(__dirname, 'fabric-repository/package.json'),
  JSON.stringify({
    ...fabricPkg,
    optionalDependencies: {},
    version: `${fabricPkg.version}-browser3`,
    name,
    description,
  }, null, '\t'),
);

writeFileSync(
  readmePath,
  description + '\n-----------\n\n' + fabricReadme,
);

execSync('cd fabric-repository && npm i --no-shrinkwrap && npm run build');
execSync('npm publish fabric-repository');

console.log('Success!');
