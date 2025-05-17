export const moduleCategoriesType = {
  name: 'module_categories',
  title: 'Module Categories',
  type: 'document',
  fields: [
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    prepare() {
      return { title: 'All Module Categories' };
    },
  },
};
