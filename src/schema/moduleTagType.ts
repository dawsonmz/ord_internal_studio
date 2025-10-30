import { defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';

export const moduleTagType = defineType({
  name: 'module_tag',
  title: 'Module Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'module_type',
      title: 'Module Type',
      description: 'The type of module that this tag applies to',
      type: 'string',
      options: {
        list: [
          { title: 'Beginners', value: 'beginners' },
        ],
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Name',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'name',
            (source: string) => source.toLowerCase().replaceAll(' ', '-')
        ),
      },
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
      name: 'name',
    },
    prepare(value: Record<string, any>) {
      const { name } = value;
      return { title: name };
    },
  },
});
