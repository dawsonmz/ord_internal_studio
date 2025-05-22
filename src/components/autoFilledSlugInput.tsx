import { useEffect } from 'react';
import { set, unset, useFormValue } from 'sanity';

export function AutoFilledSlugInput(sourceField: string, slugify: (source: string) => string) {
  return (props: any) => {
    const sourceValue = useFormValue([ sourceField ]) as string;
    const { onChange } = props;

    useEffect(
        () => {
          onChange(sourceValue ? set({ _type: 'slug', current: slugify(sourceValue) }) : unset());
        },
        [sourceValue],
    );

    return props.renderDefault(props);
  };
}
