import { defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';

export const playScenarios = [
  { title: 'Jam Start', value: 'jam-start' },
  { title: 'Mid-Jam', value: 'mid-jam' },
  { title: 'Scoring Pass', value: 'scoring-pass' },
  { title: 'Power Start', value: 'power-start' },
  { title: 'Power Mid-Jam', value: 'power-mid-jam' },
];

export const playType = defineType({
  name: 'play',
  title: 'Play',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Title',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'title',
            (source: string) => source.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        ),
      },
    }),
    defineField({
      name: 'scenario',
      title: 'Scenario',
      type: 'string',
      options: {
        list: playScenarios,
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'configuration',
      title: 'Configuration',
      type: 'string',
      options: {
        list: [
          '4 defense',
          'Dedicated offense',
          '2 offense + 2 defense',
          'All offense',
          'Advantaged',
          'Disadvantaged',
        ],
      },
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'diagram',
      title: 'Diagram',
      description: 'Static image describing the play, used as the thumbnail',
      type: 'image',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'animation',
      title: 'Animation',
      description: 'MP4 animated play, same aspect ratio as the diagram',
      type: 'file',
      options: {
        accept: 'video/mp4',
      },
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'drills',
      title: 'Drills',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'drill',
          title: 'Drill',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                { type: 'block' },
              ],
            }),
          ],
        },
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
      configuration: 'configuration',
    },
    prepare(value: Record<string, any>) {
      const { title, configuration } = value;
      return { title, subtitle: configuration };
    },
  },
});
