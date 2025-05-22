import { useEffect } from 'react';
import { set, unset, useFormValue } from 'sanity';

export function AutoFilledSlugInput(sourceField: string, slugify: (source: string) => string) {
  return (props: any) => {
    const sourceValue = useFormValue([ sourceField ]) as string;
    const { onChange, value } = props;

    useEffect(
        () => {
          if (sourceValue) {
            const newSlug = slugify(sourceValue);
            const currentSlug = value?.current;
            if (newSlug !== currentSlug) {
              onChange(set({ _type: 'slug', current: newSlug }));
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
