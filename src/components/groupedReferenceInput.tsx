import { useCallback, useEffect, useState } from 'react';
import { set, unset, useClient } from 'sanity';
import { Select, Stack } from '@sanity/ui';

export function GroupedReferenceInput(props: any) {
  const [ categories, setCategories ] = useState([]);
  const sanityClient = useClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'published' });
  const { onChange } = props;
  const handleChange = useCallback(
      (event: any) => {
        const nextValue = event.currentTarget.value;
        onChange(nextValue ? set(JSON.parse(nextValue)) : unset());
      },
      [onChange],
  );

  useEffect(
      () => {
        async function fetchCategories() {
          const cats = await sanityClient.fetch(
              `*[_type == "module_category"] | order(_createdAt asc) {
                "category": name,
                "modules": modules[] {
                  _key,
                  _ref,
                  "title": @->title,
                  "minutes": @->minutes,
                },
              }`
          );
          setCategories(cats);
        }
        if (!categories.length) {
          fetchCategories();
        }
      },
      [],
  );

  return <Stack>
      <Select fontSize={1} padding={3} space={3} onChange={handleChange} value={0}>
        <option value="">-- Select a module --</option>
        {categories.filter((category: any) => category.modules)
            .map(
                (category: any) =>
                    <optgroup label={category.category}>
                      {category.modules.map(
                          (module: any) =>
                              <option value={JSON.stringify({ _key: module._key, _ref: module._ref, _type: 'reference' })}>
                                {module.title} - {module.minutes} min
                              </option>
                      )}
                    </optgroup>
            )}
      </Select>
  </Stack>
}
