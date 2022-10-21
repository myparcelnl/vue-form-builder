const mainConfig = require('@myparcel/semantic-release-config/npm');
const {addGitHubPlugin, addGitPlugin} = require('@myparcel/semantic-release-config/src/plugins/index.js');
const {gitPluginDefaults} = require('@myparcel/semantic-release-config/src/plugins/addGitPlugin.js');

module.exports = {
  ...mainConfig,
  extends: '@myparcel/semantic-release-config/npm',
  plugins: [
    ...mainConfig.plugins,
    addGitPlugin({
      assets: [...gitPluginDefaults.assets, 'packages/**/package.json', 'packages/**/CHANGELOG.md'],
    }),
    addGitHubPlugin(),
  ],
};
