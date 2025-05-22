import { useEffect } from 'react';
import { set, unset, useFormValue } from 'sanity';

export function AutoFilledSlugInput(sourceField: string, slugify: (source: string) => string) {
  return (props: any) => {
    const sourceValue = useFormValue([ sourceField ]) as string;
    const { onChange, value } = props;

    useEffect(
        () => {
          if (sourceValue) {
            const slugified = slugify(sourceValue);
            const currentSlug = value?.current;
            if (slugified !== currentSlug) {
              onChange(set({ _type: 'slug', current: slugify(sourceValue) }));
            }
          } else if (value && value.current) {
            onChange(unset());
          }
        },
        [sourceValue],
    );

    return props.renderDefault(props);
  };
}
