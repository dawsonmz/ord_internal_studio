import { defineField, defineType } from "sanity";

export const seasonType = defineType({
  name: 'season',
  title: 'Season',
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
      validation: rule => rule.required(),
      options: {
        source: 'name',
        slugify: (input: String) => input.toLowerCase().replaceAll(' ', ''),
      },
    }),
    defineField({
      name: 'training_plans',
      title: 'Training Plans',
      description: 'Training plans on the schedule for this season.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'training_plan' }],
        },
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
