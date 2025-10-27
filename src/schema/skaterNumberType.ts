import { defineField, defineType } from 'sanity';

export const skaterNumberType = defineType({
  name: 'skater_number',
  title: 'Skater Number',
  type: 'document',
  fields: [
    defineField({
      name: 'skater_number',
      title: 'Skater Number',
      type: 'string',
    }),
    defineField({
      name: 'derby_name',
      title: 'Derby Name',
      type: 'string',
    }),
    defineField({
      name: 'temporary',
      title: 'Temporary Name',
      description: 'True if the name is a placeholder for a skater still choosing their derby name',
      type: 'boolean',
    }),
  ],
  initialValue: {
    temporary: false,
  },
  preview: {
    select: {
      skater_number: 'skater_number',
      derby_name: 'derby_name',
    },
    prepare(value: Record<string, any>) {
      const { skater_number, derby_name } = value;
      const title = skater_number ? `${skater_number} ${derby_name}` : `(no number) ${derby_name}`
      return { title };
    },
  },
});
