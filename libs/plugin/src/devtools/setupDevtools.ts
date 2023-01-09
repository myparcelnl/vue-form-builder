/* eslint-disable max-lines-per-function */
import {App, setupDevtoolsPlugin} from '@vue/devtools-api';
import {StateBase} from '@vue/devtools-api/lib/esm/api/component';
import {createFormNode} from './createFormNode';
import {getComponentName} from './getComponentName';
import {FormInstance, useFormBuilder} from '@myparcel-vfb/core';
import {UnwrapNestedRefs} from 'vue';

const formInspectorId = `myparcel-form-builder-inspector`;

// eslint-disable-next-line max-lines-per-function
export const setupDevtools = (app: App): void => {
  setupDevtoolsPlugin(
    {
      id: `myparcel-form-builder`,
      // componentStateTypes: [stateType],
      label: 'MyParcel Form builder',
      packageName: '@myparcel-vfb/core',
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

          payload.rootNodes = Object.entries(data.forms.value).map(([name, form]) => {
            return createFormNode(name, form as unknown as UnwrapNestedRefs<FormInstance>);
          });
        }
      });

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === formInspectorId) {
          const split = payload.nodeId.split('|');

          const {form: formName, field: fieldName} = split.reduce(
            (acc, part) => {
              const parts = part.split(':');

              if (Object.keys(acc).includes(parts[0])) {
                acc[parts[0] as keyof typeof acc] = parts[1];
              }

              return acc;
            },
            {form: null, field: null} as {form: string | null; field: string | null},
          );

          if (!formName || !fieldName) {
            return;
          }

          const formBuilder = useFormBuilder();
          const form = formBuilder.forms.value[formName];

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const field = form.fields.find((field) => field.name === fieldName) as FieldInstance;

          const outputOptions = ([key, value]: [string, unknown]) => {
            const options: StateBase = {
              key,
              value,
              editable: false,
            };

            if (key === 'ref') {
              options.editable = true;
              options.objectType = 'ref';
            }

            if (key === 'component' && typeof value === 'object') {
              options.value = getComponentName(field);
            }

            return options;
          };

          payload.state = {
            'input configuration': Object.entries(field.config).map(outputOptions),
            'resolved configuration': Object.entries(field)
              .filter(([key]) => !['hookNames', 'config', 'form'].includes(key))
              .map(outputOptions),
          };
        }
      });
    },
  );
};
