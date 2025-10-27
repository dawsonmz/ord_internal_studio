import { defineArrayMember, defineField, defineType, useClient } from 'sanity';
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
      options: {
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const sanityClient = getClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'drafts' });

          var id = document!._id;
          if (id.startsWith('drafts.')) {
            id = id.substring(7);
          }
          
          const parent = await sanityClient.fetch(
              `*[_type == "season" && $currentId in training_plans[]->_id] {
                _id,
                _originalId,
                "slugs": training_plans[@->_id != $currentId]->slug.current,
              }`,
              { currentId: id },
          );
        
          if (!parent || !parent.length) {
            return true;
          } else if (parent.length > 1) {
            console.warn(`Multiple season documents reference the same training plan ${id}`);
            return false;
          }
          return parent[0].slugs.filter((s: String) => s === slug).length < 1;
        },
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
  initialValue: {
    visible: false,
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
