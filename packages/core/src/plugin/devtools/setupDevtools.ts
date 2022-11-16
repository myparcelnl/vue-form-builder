import {App, setupDevtoolsPlugin} from '@vue/devtools-api';
import {createFormNode} from './createFormNode';
import {useFormBuilder} from '../../composables';

const formInspectorId = `myparcel-form-builder-inspector`;

// eslint-disable-next-line max-lines-per-function
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
    // eslint-disable-next-line max-lines-per-function
    (api) => {
      let activePayload;

      api.addInspector({
        id: formInspectorId,
        noSelectionText: 'No form selected',
        actions: [
          {
            icon: 'refresh',
            tooltip: 'Refresh',
            action: () => {
              // console.log('refresh');
            },
          },
        ],
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

          payload.rootNodes = Object.entries(data.forms).map(([name, form]) => createFormNode(name, form));
        }
      });

      api.on.getInspectorState((payload) => {
        // console.log('getInspectorState', payload, ctx);

        if (payload.inspectorId !== formInspectorId) {
          // console.log('it me');
        }
      });

      api.on.inspectComponent((payload) => {
        // console.warn('inspectComponent', payload, ctx);
        payload.instanceData.state.push({
          type: 'My Awesome Plugin state',
          key: '$hello',
          value: 'tekkest1',
        });

        payload.instanceData.state.push({
          type: 'My Awesome Plugin state',
          key: 'time counter',
          value: 'tekkest',
        });
      });
    },
  );
};
