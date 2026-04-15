import { defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';
import { GroupedModuleListInput } from '../components/groupedModuleListInput';
import { isTrainingPlanSlugUnique } from '../components/isTrainingPlanSlugUnique';
import { TrainingModuleListField } from '../components/trainingModuleListField';

export const trainingPlanType = defineType({
  name: 'training_plan',
  title: 'Training Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{ type: 'season' }],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'type',
      title: 'Training Type',
      type: 'string',
      options: {
        list: [
          { title: 'Beginners', value: 'beginners' },
        ],
      },
    }),
    defineField({
      name: 'training_label',
      title: 'Training Label',
      description: 'Unique (within season) identifier for the training plan, e.g. 1, 2, 3, etc.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Training Label',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'training_label',
            (source: string) => source.toLowerCase().replaceAll(' ', '-')
        ),
      },
      options: {
        isUnique: isTrainingPlanSlugUnique,
      },
    }),
    defineField({
      name: 'date_time',
      title: 'Date and Time',
      type: 'datetime',
      options: {
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Brief summary of the skills covered',
      type: 'string',
    }),
    defineField({
      name: 'visible',
      title: 'Visible',
      description: 'Whether to show the training plan on the website',
      type: 'boolean',
    }),
    defineField({
      name: 'omit_timestamps',
      title: 'Omit Timestamps',
      description: 'Whether to compute and display drill starting times',
      type: 'boolean',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'module' }],
          options: {
            disableNew: true,
          },
          components: {
            input: GroupedModuleListInput,
          },
        },
      ],
      components: {
        field: TrainingModuleListField,
      },
    }),
  ],
  initialValue: {
    visible: false,
    omit_timestamps: false,
  },
  preview: {
    select: {
      training_label: 'training_label',
      date_time: 'date_time',
    },
    prepare(value: Record<string, any>) {
      const { training_label, date_time } = value;
      return {
        title: `Training ${training_label}`,
        subtitle: date_time ? new Date(date_time.valueOf()).toLocaleDateString('en-GB', { dateStyle: 'full' }) : '',
      };
    },
  },
});
