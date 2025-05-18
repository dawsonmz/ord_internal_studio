export const trainingPlanType = {
  name: 'training_plan',
  title: 'Training Plan',
  type: 'document',
  fields: [
    {
      name: 'training_label',
      title: 'Training Label',
      description: 'Unique (within season) identifier for the training plan, e.g. 1, 2, 3, etc.',
      type: 'string',
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
      training_label: 'training_label',
      date_time: 'date_time',
    },
    prepare(value: Record<string, any>) {
      const { training_label, date_time } = value;
      return {
        title: `Training ${training_label}`,
        subtitle: new Date(date_time.valueOf()).toLocaleDateString('en-GB', { dateStyle: 'full' }),
      };
    },
  },
};
