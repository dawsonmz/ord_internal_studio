import { QueryListOptions } from './queryListOptions';

export const trainingPlanType = {
  name: 'training_plan',
  title: 'Training Plan',
  type: 'document',
  fields: [
    {
      name: 'training_label',
      title: 'Training Label',
      type: 'string',
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [],
        singletonType: 'seasons',
        fieldName: 'seasons',
      },
      components: {
        input: QueryListOptions,
      },
    },
    {
      name: 'date_time',
      title: 'Date and Time',
      type: 'datetime',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'string',
    },
    {
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
        },
      ],
    },
  ],
  preview: {
    select: {
      season: 'season',
      training_label: 'training_label',
      date_time: 'date_time',
    },
    prepare(value: Record<string, any>) {
      const { season, training_label, date_time } = value;
      return {
        title: `${season} - Training ${training_label}`,
        subtitle: new Date(date_time.valueOf()).toLocaleDateString('en-GB', { dateStyle: 'full' }),
      };
    },
  },
};
