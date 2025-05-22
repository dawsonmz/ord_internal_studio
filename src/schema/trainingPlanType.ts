import { defineArrayMember, defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';
import { GroupedReferenceInput } from '../components/groupedReferenceInput';
import { TrainingModuleListField } from '../components/trainingModuleListField';

export const trainingPlanType = defineType({
  name: 'training_plan',
  title: 'Training Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'training_label',
      title: 'Training Label',
      description: 'Unique (within season) identifier for the training plan, e.g. 1, 2, 3, etc.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Training Label.',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'training_label',
            (source: string) => source.toLowerCase().replaceAll(' ', '-')
        ),
      },
    }),
    defineField({
      name: 'date_time',
      title: 'Date and Time',
      type: 'datetime',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'module' }],
          options: {
            disableNew: true,
          },
          components: {
            input: GroupedReferenceInput,
          },
        }),
      ],
      components: {
        field: TrainingModuleListField,
      },
    }),
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
});
