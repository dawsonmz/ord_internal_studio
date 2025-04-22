export const moduleCategoryType = {
    name: 'module_category',
    title: 'Module Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
    ],
    preview: {
        select: {
            title: 'name',
        },
    },
};
