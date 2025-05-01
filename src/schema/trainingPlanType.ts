export const trainingPlanType = {
    name: 'training_plan',
    title: 'Training Plan',
    type: 'document',
    fields: [
        {
            name: 'training_number',
            title: 'Training Number',
            type: 'number',
        },
        {
            name: 'season',
            title: 'Season',
            type: 'reference',
            to: [{ type: 'season' }],
        },
        {
            name: 'date_time',
            title: 'Date and Time',
            type: 'datetime',
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'string',
        },
        {
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'module' }],
                    options: {
                        disableNew: true,
                    },
                },
            ],
        },
    ],
    preview: {
        select: {
            season: 'season.season',
            year: 'season.year',
            training_number: 'training_number',
            date_time: 'date_time',
        },
        prepare(value: Record<string, any>) {
            const { season, year, training_number, date_time } = value;
            return {
                title: `${season} ${year} - Training ${training_number}`,
                subtitle: new Date(date_time.valueOf()).toLocaleDateString('en-GB', { dateStyle: 'full' }),
            };
        },
    },
};
