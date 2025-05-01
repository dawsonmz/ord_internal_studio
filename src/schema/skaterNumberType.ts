export const skaterNumberType = {
    name: 'skater_number',
    title: 'Skater Number',
    type: 'document',
    fields: [
        {
            name: 'derby_name',
            title: 'Derby Name',
            type: 'string',
        },
        {
            name: 'skater_number',
            title: 'Skater Number',
            type: 'string',
        },
    ],
    preview: {
        select: {
            derby_name: 'derby_name',
            skater_number: 'skater_number',
        },
        prepare(value: Record<string, any>) {
            const { derby_name, skater_number } = value;
            return {
                title: `${derby_name} ${skater_number}`,
            };
        },
    },
};
