import mainConfig from '@myparcel/semantic-release-config/npm';
import { addGitHubPlugin, addGitPlugin } from '@myparcel/semantic-release-config/src/plugins/index.js';
import { gitPluginDefaults } from '@myparcel/semantic-release-config/src/plugins/addGitPlugin.js';

export default {
  ...mainConfig,
  extends: '@myparcel/semantic-release-config/npm',
  plugins: [
    ...mainConfig.plugins,
    addGitPlugin({
      assets: [
        ...gitPluginDefaults.assets,
        'packages/**/package.json',
        'packages/**/CHANGELOG.md',
      ],
    }),
    addGitHubPlugin(),
  ],
};