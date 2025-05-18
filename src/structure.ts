import type { StructureBuilder, StructureResolver } from 'sanity/structure';

// Top-level document types for the left-hand panel.
export const topLevelTypes = new Map(
    [
      ['module_category', 'Modules by Category'],
      ['season', 'Training Plans by Season'],
      ['skater_number', 'Skater Numbers'],
    ],
);

export const structure: StructureResolver = (
    S: StructureBuilder
) => S
    .list()
    .title('Documents')
    .items(
        topLevelTypes
            .entries()
            .map(
                ([type, label]: [string, string]) =>
                    S.listItem()
                        .title(label)
                        .child(S.documentTypeList(type).title(label))
            )
            .toArray(),
    );