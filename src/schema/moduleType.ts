import { defineArrayMember, defineField, defineType } from 'sanity';
import { ModuleAdditionalTagListInput, ModuleMainTagListInput } from '../components/moduleTagListInput';

export const moduleType = defineType({
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Module Type',
      type: 'string',
      options: {
        list: [
          { title: 'Beginners', value: 'beginners' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'main_tag',
      title: 'Main Tag',
      description: 'The main category this module belongs to',
      type: 'reference',
      to: [{ type: 'module_tag' }],
      options: {
        disableNew: true,
      },
      components: {
        input: ModuleMainTagListInput,
      },
    }),
    defineField({
      name: 'additional_tags',
      title: 'Additional Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'module_tag' }],
          options: {
            disableNew: true,
          },
          components: {
            input: ModuleAdditionalTagListInput,
          },
        }),
      ],
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
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
    defineField({
      name: 'detailed_text',
      title: 'Detailed Text',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      description: 'Used by Orderable Document List plugin, do not modify',
      type: 'string',
      hidden: true,
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
