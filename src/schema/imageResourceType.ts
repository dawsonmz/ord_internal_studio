import { defineField, defineType } from "sanity";

export const imageResourceType = defineType({
  name: 'image_resource',
  title: 'Image Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
    }),
  ],
});
