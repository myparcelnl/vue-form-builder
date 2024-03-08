import {type Ref, ref} from 'vue';
import {type FormInstance, type MaybeUnwrapNestedRefs, FORM_HOOKS, type FieldInstance} from '@myparcel-vfb/core';
import {isOfType} from '@myparcel/ts-utils';

export const useFormEventLog = (form: MaybeUnwrapNestedRefs<FormInstance>): Ref<string> => {
  const eventLog = ref<string>('');

  FORM_HOOKS.forEach((hook) => {
    form.on(hook, (_, ...args) => {
      const additionalArgs = args as unknown as [unknown, unknown];

      let log = `${new Date().toISOString()} | ${hook}`;

      if (additionalArgs.length && isOfType<FieldInstance>(additionalArgs[0], 'ref')) {
        log += ` (${additionalArgs[0].name}, ${additionalArgs[1]})`;
      }

      eventLog.value = `${log}\n${eventLog.value}`;
    });
  });

  return eventLog;
};
