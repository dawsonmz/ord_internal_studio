import { defineArrayMember, defineField, defineType } from 'sanity';

export const rosterType = defineType({
  name: 'roster',
  title: 'Roster',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Roster Name',
      type: 'string',
    }),
    defineField({
      name: 'identifier',
      title: 'Roster Identifier',
      type: 'string',
    }),
    defineField({
      name: 'line_a_name',
      title: 'Line A Name',
      type: 'string',
    }),
    defineField({
      name: 'line_a',
      title: 'Line A',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'skater_number' }],
          options: {
            disableNew: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'line_b_name',
      title: 'Line B Name',
      type: 'string',
    }),
    defineField({
      name: 'line_b',
      title: 'Line B',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'skater_number' }],
          options: {
            disableNew: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'bench',
      title: 'Bench',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'skater_number' }],
          options: {
            disableNew: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
