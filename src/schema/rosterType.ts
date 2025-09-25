import { defineArrayMember, defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';

export const rosterType = defineType({
  name: 'roster',
  title: 'Roster',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Roster Name',
      description: 'The full name of the team that the roster belongs to.',
      type: 'string',
    }),
    defineField({
      name: 'short_name',
      title: 'Short Roster Name',
      description: 'A shortened name used for display; will be slugified.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Short Roster Name.',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'short_name',
            (source: string) => source.toLowerCase().replaceAll(' ', '-')
        ),
      },
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
      name: 'jammers',
      title: 'Jammers',
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
    select: { title: 'short_name' },
  },
});
