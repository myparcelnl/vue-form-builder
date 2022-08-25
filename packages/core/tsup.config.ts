import {createTsupConfig} from '@myparcel/vue-form-builder-build-tsup';

export default createTsupConfig({
  // onSuccess: async () => {
  //   // copy all **/*.vue files to the lib folder
  //   const files = await globby('src/**/*.vue', {gitignore: true});
  //
  //   await Promise.all(
  //     files.map(async (file) => {
  //       await fs.promises.mkdir(path.dirname(`lib/${file}`), {recursive: true});
  //
  //       return fs.promises.copyFile(`src/${file}`, `lib/${file}`);
  //     }),
  //   );
  // },
});
