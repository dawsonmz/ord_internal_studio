import { useCallback, useEffect, useState } from 'react';
import { set, unset, useClient, useFormValue } from 'sanity';
import { Select, Stack } from '@sanity/ui';
import { uuid } from '@sanity/uuid';

export function GroupedModuleListInput(props: any) {
  const [ moduleTags, setModuleTags ] = useState([]);
  const sanityClient = useClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'published' });

  const { onChange } = props;
  const handleChange = useCallback(
      (event: any) => {
        const nextValue = event.currentTarget.value;
        onChange(nextValue ? set(JSON.parse(nextValue)) : unset());
      },
      [onChange],
  );

  const trainingType = useFormValue([ 'type' ]) as string;
  useEffect(
      () => {
        async function fetchModuleTags() {
          const tags = await sanityClient.fetch(
              `*[_type == "module_tag" && module_type == $module_type] | order(orderRank asc) {
                name,
                "modules": *[_type == "module" && main_tag._ref == ^._id] | order(orderRank asc) {
                  _id,
                  title,
                  minutes,
                },
              }`,
              { module_type: trainingType },
          );
          setModuleTags(tags);
        }
        if (trainingType && !moduleTags.length) {
          fetchModuleTags();
        } else if (!trainingType) {
          setModuleTags([]);
        }
      },
      [trainingType],
  );

  return <Stack>
      <Select fontSize={1} padding={3} space={3} onChange={handleChange} value={0}>
        <option value="">
          { trainingType ? '-- Select a module --' : '-- Fill in type field first --' }
        </option>
        {moduleTags.filter((moduleTag: any) => moduleTag.modules && moduleTag.modules.length)
            .map(
                (moduleTag: any) =>
                    <optgroup label={moduleTag.name}>
                      {moduleTag.modules.map(
                          (module: any) =>
                              <option value={JSON.stringify({ _key: uuid(), _ref: module._id, _type: 'reference' })}>
                                {module.title} - {module.minutes} min
                              </option>
                      )}
                    </optgroup>
            )}
      </Select>
  </Stack>
}
