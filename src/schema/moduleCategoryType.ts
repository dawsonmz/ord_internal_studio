import { defineArrayMember, defineField, defineType } from "sanity";

export const moduleCategoryType = defineType({
  name: 'module_category',
  title: 'Module Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; use the \'Generate\' button to auto-fill.',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input: String) => input.toLowerCase().replaceAll(' ', '-'),
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      description: 'Modules for this category.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'module' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(value: Record<string, any>) {
      const { name } = value;
      return {
        title: name,
      };
    },
  },
});
