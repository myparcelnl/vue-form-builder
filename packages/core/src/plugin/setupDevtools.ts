import {App, setupDevtoolsPlugin} from '@vue/devtools-api';
import {useFormBuilder} from '../composables';

export const setupDevtools = (app: App): void => {
  setupDevtoolsPlugin(
    {
      id: `myparcel-form-builder`,
      // componentStateTypes: [stateType],
      label: 'MyParcel Form builder',
      packageName: '@myparcel/vue-form-builder',
      homepage: 'https://github.com/myparcelnl/vue-form-builder',
      logo: 'https://backoffice.myparcel.nl/static/myparcel-nederland/skin/images/logo-icon.svg',
      app,
    },
    (api) => {
      let activePayload;

      console.log(api);

      const formInspectorId = `myparcel-form-builder-inspector`;

      api.addInspector({
        id: formInspectorId,
        label: 'Forms',
        icon: 'view_list',
        treeFilterPlaceholder: 'Search forms',
      });

      api.on.getInspectorTree((payload) => {
        activePayload = payload;

        if (payload.app === app && payload.inspectorId === formInspectorId) {
          if (!activePayload) {
            return;
          }
          const payload = activePayload;

          const data = useFormBuilder();
          console.log(data);
          console.log(data.forms);

          console.log(payload);

          console.log(payload.rootNodes);
          payload.rootNodes = Object.entries(data.forms).map(([name, form]) => {
            console.log(name, form);
            const aaaaa: {
              id: string;
              label: string;
              tags: {backgroundColor: number; label: string; textColor: number}[];
            } = {
              id: name,
              label: name,
              tags: [
                {
                  label: name,
                  textColor: 0,
                  backgroundColor: ORANGE_400,
                },
              ],
            };
            console.log(aaaaa);
            return aaaaa;
          });

          // children routes will appear as nested
          // let routes = matcher.getRoutes().filter((route) => !route.parent);
          //
          // // reset match state to false
          // routes.forEach(resetMatchStateOnRouteRecord);
          //
          // // apply a match state if there is a payload
          // if (payload.filter) {
          //   routes = routes.filter((route) =>
          //     // save matches state based on the payload
          //     isRouteMatching(route, payload.filter.toLowerCase()),
          //   );
          // }
          //
          // // mark active routes
          // routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
          // payload.rootNodes = routes.map(formatRouteRecordForInspector);
        }
      });
    },
  );
};

const PINK_500 = 0xec4899;
const BLUE_600 = 0x2563eb;
const LIME_500 = 0x84cc16;
const CYAN_400 = 0x22d3ee;
const ORANGE_400 = 0xfb923c;
// const GRAY_100 = 0xf4f4f5
const DARK = 0x666666;
