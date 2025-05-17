import { QueryListOptions } from './queryListOptions';

export const moduleType = {
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [],
        singletonType: 'module_categories',
        fieldName: 'categories',
      },
      components: {
        input: QueryListOptions,
      },
    },
    {
      name: 'minutes',
      title: 'Minutes',
      type: 'number',
    },
    {
      name: 'short_text',
      title: 'Short Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'detailed_text',
      title: 'Detailed Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [
        { type: 'image_resource' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      minutes: 'minutes',
    },
    prepare(value: Record<string, any>) {
      const { title, category, minutes } = value;
      return {
        title: `${category}: ${title}`,
        subtitle: `${minutes} min`,
      };
    },
  },
};