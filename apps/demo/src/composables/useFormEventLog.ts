import {type Ref, ref} from 'vue';
import {FormHook, type FormInstance, type InteractiveElement, type MaybeUnwrapNestedRefs} from '@myparcel-vfb/core';
import {isOfType} from '@myparcel/ts-utils';

export const useFormEventLog = (form: MaybeUnwrapNestedRefs<FormInstance>): Ref<string> => {
  const eventLog = ref<string>('');

  Object.values(FormHook).forEach((hook) => {
    form.off(hook);
    form.on(hook, (_, ...args) => {
      const additionalArgs = args as unknown as [unknown, unknown];

      let log = `${new Date().toISOString()} | ${hook}`;

      if (additionalArgs.length && isOfType<InteractiveElement>(additionalArgs[0], 'ref')) {
        log += ` (${additionalArgs[0].name}, ${additionalArgs[1]})`;
      }

      eventLog.value = `${log}\n${eventLog.value}`;
    });
  });

  return eventLog;
};
