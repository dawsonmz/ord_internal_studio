export const seasonType = {
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          'Spring',
          'Fall',
        ],
      },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
  ],
  preview: {
    select: {
      season: 'season',
      year: 'year',
    },
    prepare(value: Record<string, any>) {
      const { season, year } = value;
      return {
        title: `${season} ${year}`,
      };
    },
  },
};