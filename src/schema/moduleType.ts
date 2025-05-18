import { defineArrayMember, defineField, defineType } from "sanity";

export const moduleType = defineType({
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'minutes',
      title: 'Minutes',
      type: 'number',
    }),
    defineField({
      name: 'short_text',
      title: 'Short Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'detailed_text',
      title: 'Detailed Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image_resource',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      minutes: 'minutes',
    },
    prepare(value: Record<string, any>) {
      const { title, minutes } = value;
      return {
        title: `${title}`,
        subtitle: `${minutes} min`,
      };
    },
  },
});
