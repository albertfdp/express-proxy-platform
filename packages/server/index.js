const { getPackages } = require('@lerna/project');
const filterPackages = require('@lerna/filter-packages');
const batchPackages = require('@lerna/batch-packages');

const path = require('path');

const rootDir = path.join(__dirname, '../..');

async function getAllPackages(scope, ignore = ['server']) {
  const packages = await getPackages(rootDir);
  const filtered = filterPackages(packages, scope, ignore);

  return batchPackages(filtered).reduce((arr, batch) => {
    return arr.concat(batch);
  }, []);
}

(async () => {
  const packages = await getAllPackages();

  for (const package of packages) {
    const config = require(`${package.name}/package.json`);
    console.log(config.name, config.version);
  }
})();
