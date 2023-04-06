const branch = require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const prereleaseBranches = ['next', 'alpha', 'beta', 'rc'];

/**
 * @type {import('@monodeploy/types').MonodeployConfiguration}
 */
module.exports = {
  autoCommitMessage: 'chore: release [skip ci]',
  changelogFilename: '<packageDir>/CHANGELOG.md',
  conventionalChangelogConfig: 'conventional-changelog-conventionalcommits',
  git: {
    baseBranch: '166be8cadfb8cab31cd4d3153f8f6851261a2454',
  },
  persistVersions: true,
  plugins: ['@monodeploy/plugin-github'],
  prerelease: prereleaseBranches.includes(branch),
  prereleaseId: branch,
  prereleaseNPMTag: branch,
  preset: 'monodeploy/preset-recommended',
  registryUrl: 'https://registry.npmjs.org',
};
