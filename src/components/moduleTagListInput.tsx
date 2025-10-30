import { useCallback, useEffect, useState } from 'react';
import { set, unset, useClient, useFormValue } from 'sanity';
import { Select, Stack } from '@sanity/ui';
import { uuid } from '@sanity/uuid';

export function ModuleMainTagListInput(props: any) {
  return ModuleTagListInput(props, true);
}

export function ModuleAdditionalTagListInput(props: any) {
  return ModuleTagListInput(props, false);
}

function ModuleTagListInput(props: any, mainTag: boolean) {
  const [ moduleTags, setModuleTags ] = useState([]);
  const sanityClient = useClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'published' });
  const mainTagValue = mainTag ? JSON.stringify(useFormValue([ 'main_tag' ])) : '';

  const { onChange } = props;
  const handleChange = useCallback(
      (event: any) => {
        const nextValue = event.currentTarget.value;
        onChange(nextValue ? set(JSON.parse(nextValue)) : unset());
      },
      [onChange],
  );

  const moduleType = useFormValue([ 'type' ]) as string;
  useEffect(
      () => {
        async function fetchModuleTags() {
          const tags = await sanityClient.fetch(
              `*[_type == "module_tag" && module_type == "${moduleType}"] | order(orderRank asc) {
                _id,
                name,
              }`
          );
          setModuleTags(tags);
        }
        if (moduleType && !moduleTags.length) {
          fetchModuleTags();
        } else if (!moduleType) {
          setModuleTags([]);
        }
      },
      [moduleType],
  );

  return <Stack>
      <Select fontSize={1} padding={3} space={3} onChange={handleChange} value={mainTagValue}>
        <option value="">
          { moduleType ? '-- Select a module tag --' : '-- Fill in type field first --' }
        </option>
        {moduleTags.map(
            (moduleTag: any) =>
                <option value={JSON.stringify(mainTag ? { _ref: moduleTag._id, _type: 'reference' } : { _key: uuid(), _ref: moduleTag._id, _type: 'reference' })}>
                  {moduleTag.name}
                </option>
        )}
      </Select>
  </Stack>
}
