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
  ],
  preview: {
    select: {
      skater_number: 'skater_number',
      derby_name: 'derby_name',
    },
    prepare(value: Record<string, any>) {
      const { skater_number, derby_name } = value;
      return {
        title: `${skater_number} ${derby_name}`,
      };
    },
  },
});
