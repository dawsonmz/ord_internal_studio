export const seasonsType = {
  name: 'seasons',
  title: 'Seasons',
  type: 'document',
  fields: [
    {
      name: 'seasons',
      title: 'Seasons',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    prepare() {
      return { title: 'All Seasons' };
    },
  },
};
