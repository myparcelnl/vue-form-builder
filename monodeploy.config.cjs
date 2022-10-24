const branch = require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const prereleaseBranches = ['next', 'alpha', 'beta', 'rc'];

/**
 * @type {import('@monodeploy/types').MonodeployConfiguration}
 */
module.exports = {
  preset: 'monodeploy/preset-recommended',
  changelogFilename: '<packageDir>/CHANGELOG.md',
  changesetFilename: '-',
  conventionalChangelogConfig: 'conventional-changelog-conventionalcommits',
  plugins: [
    '@monodeploy/plugin-github',
  ],
  prerelease: prereleaseBranches.includes(branch),
  prereleaseId: branch,
  prereleaseNPMTag: branch,
  registryUrl: 'https://registry.npmjs.org',
};
