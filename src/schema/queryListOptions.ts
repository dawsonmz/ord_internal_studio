import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';

const sanityClientCredentials = {
  option: createClient(
      {
        projectId: 'vh55mhjn',
        dataset: 'internal',
        useCdn: true,
        apiVersion: '2025-04-15',
      },
  ),
};

export const QueryListOptions = (props: { schemaType: any; renderDefault: any; }) => {
  const [ listItems, setListItems ] = useState([]);
  const { schemaType, renderDefault } = props;
  const { options } = schemaType;
  const { singletonType, fieldName } = options

   useEffect(
    () => {
      const getListOptions = async () =>
          sanityClientCredentials.option.fetch(`*[_type == "${singletonType}"]`)
              .then((res) => res[0][fieldName])
              .then(setListItems);
      getListOptions();
    },
    [ singletonType, fieldName ],
  );

  return renderDefault(
      {
        ...props,
        schemaType: {
          ...schemaType,
          options: {
            ...options,
            list: listItems
          },
        },
      },
  );
};