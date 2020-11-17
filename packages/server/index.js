const path = require('path');
const express = require('express');

const { getPackages } = require('@lerna/project');
const filterPackages = require('@lerna/filter-packages');
const batchPackages = require('@lerna/batch-packages');
const { createProxyMiddleware } = require('http-proxy-middleware');

const rootDir = path.join(__dirname, '../..');

async function getAllPackages(scope, ignore = ['server']) {
  const packages = await getPackages(rootDir);
  const filtered = filterPackages(packages, scope, ignore);

  return batchPackages(filtered).reduce((arr, batch) => {
    return arr.concat(batch);
  }, []);
}

const getPackageConfig = (package) => {
  const packageJson = require(`${package.name}/package.json`);

  if (typeof packageJson.application === 'string') {
    return require(`${package.name}/${packageJson.application}`);
  }

  return packageJson.application;
};

async function getLocalApplications() {
  const packages = await getAllPackages();
  const configs = packages.reduce((acc, package) => {
    const config = getPackageConfig(package);

    acc[package.name] = {
      name: package.name,
      location: package.location,
      ...config,
    };
    return acc;
  }, {});

  return configs;
}

const createApplication = async () => {
  const expressApp = express();

  const apps = await getLocalApplications();

  for (const app of Object.keys(apps)) {
    const config = apps[app];

    if (process.env.NODE_ENV === 'production') {
      const dist = path.join(config.location, 'dist');

      expressApp.use(
        config.routes,
        express.static(dist, { maxAge: 1000 * 60 * 60 * 24 })
      );
    } else {
      const proxy = createProxyMiddleware({
        target: `http://localhost:${config.port}`,
        changeOrigin: true,
        ws: true,
      });

      expressApp.use(config.routes, proxy);
    }
  }

  expressApp.listen(3000, () => {
    console.log('Server running at :3000');
  });

  return expressApp;
};

createApplication();
