import type { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// Top-level document types for the left-hand panel.
export const topLevelTypes = new Map(
    [
      ['module_category', 'Modules by Category'],
      ['season', 'Seasons'],
      ['skater_number', 'Skater Numbers'],
      ['roster', 'Rosters'],
      ['footage', 'Footage'],
    ],
);

const orderableTypes = ['season'];

export const structure: StructureResolver = (
    S: StructureBuilder,
    context: StructureResolverContext,
) => S
    .list()
    .title('Documents')
    .items(
        topLevelTypes
            .entries()
            .map(
                ([type, label]: [string, string]) =>
                    orderableTypes.includes(type)
                        ? orderableDocumentListDeskItem({ type, title: label, S, context })
                        : S.listItem()
                            .title(label)
                            .child(S.documentTypeList(type).title(label))
            )
            .toArray(),
    );
