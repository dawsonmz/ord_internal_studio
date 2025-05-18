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
};