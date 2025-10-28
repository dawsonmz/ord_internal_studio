import { defineField, defineType } from 'sanity';

export const footageType = defineType({
  name: 'footage',
  title: 'Footage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Example: Oslo vs. Vienna',
      type: 'string',
    }),
    defineField({
      name: 'event',
      title: 'Event Name',
      description: 'Example: Tiger City Takedown',
      type: 'string',
    }),
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
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'A Team', value: 'A Team' },
          { title: 'B Team', value: 'B Team' },
          { title: 'Scrimmage', value: 'Scrimmage' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'id',
      title: 'YouTube video ID',
      description: 'Unique ID for the YouTube video shown in the link, e.g. https://www.youtube.com/watch?v=<id here>',
      type: 'string',
    }),
    defineField({
      name: 'start_seconds',
      title: 'Start Time (seconds)',
      description: 'The number of seconds from the beginning that the YouTube video should be timestamped at',
      type: 'number',
    }),
    defineField({
      name: 'other_link',
      title: 'Other Video Link',
      description: 'URL for a video source other than YouTube; if populated, YouTube video ID and Start Time should be left empty',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      date: 'date',
    },
    prepare(value: Record<string, any>) {
      const { title, type, date } = value;
      return {
        title: `${title} (${type})`,
        subtitle: date
            ? new Date(date.valueOf())
                .toLocaleDateString(
                    'en-GB',
                    {
                      timeZone: 'Europe/Oslo',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    },
                )
            : '',
      };
    },
  },
});
