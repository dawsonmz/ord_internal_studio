import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Update', value: 'Update' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL',
      type: 'slug',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
      ],
    }),
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
      date: 'date',
    },
    prepare(value: Record<string, any>) {
      const { type, title, date } = value;
      return {
        title: `${type}: ${title}`,
        subtitle: date ? new Date(date).toLocaleDateString('en-GB', { dateStyle: 'full' }) : '',
      };
    },
  },
});
