/* eslint-disable max-lines-per-function */
import {App, setupDevtoolsPlugin} from '@vue/devtools-api';
import {FormInstance, useFormBuilder} from '@myparcel-vfb/core/src';
import {PINK_500} from './types';
import {StateBase} from '@vue/devtools-api/lib/esm/api/component';
import {UnwrapNestedRefs} from 'vue';
import {createFormNode} from './createFormNode';
import {get} from '@vueuse/core';
import {getComponentName} from './getComponentName';

const PREFIX = `myparcel-form-builder`;

const TIMELINE_ID = `${PREFIX}-events`;
const INSPECTOR_ID = `${PREFIX}-inspector`;

// eslint-disable-next-line max-lines-per-function
export const setupDevtools = (app: App): void => {
  setupDevtoolsPlugin(
    {
      id: `myparcel-form-builder`,
      label: 'MyParcel Form builder',
      packageName: '@myparcel/vue-form-builder',
      homepage: 'https://github.com/myparcelnl/vue-form-builder',
      logo: 'https://backoffice.myparcel.nl/static/myparcel-nederland/skin/images/logo-icon.svg',
      app,
    },
    // eslint-disable-next-line max-lines-per-function
    (api) => {
      let activePayload;

      api.addTimelineLayer({
        id: TIMELINE_ID,
        color: PINK_500,
        label: 'Forms',
      });

      api.addInspector({
        id: INSPECTOR_ID,
        noSelectionText: 'No form selected',
        label: 'Forms',
        icon: 'view_list',
        treeFilterPlaceholder: 'Search forms',
      });

      api.on.getInspectorTree((payload) => {
        activePayload = payload;

        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (!activePayload) {
            return;
          }

          const payload = activePayload;
          const data = useFormBuilder();

          payload.rootNodes = Object.entries(get(data.forms)).map(([name, form]) => {
            return createFormNode(name, form as unknown as UnwrapNestedRefs<FormInstance>);
          });
        }
      });

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId === INSPECTOR_ID) {
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
          const form = get(formBuilder.forms)[formName];

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
