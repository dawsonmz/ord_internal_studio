export const imageResourceType = {
  name: 'image_resource',
  title: 'Image Resource',
  type: 'document',
  fields: [
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    },
  ],
};
