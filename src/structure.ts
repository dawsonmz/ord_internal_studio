import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const singletonActions = new Set(["publish", "discardChanges", "restore"]);
export const singletonTypes = new Map(
    [
      [ "module_categories", "Module Categories" ],
      [ "seasons", "Seasons" ],
    ],
);

export const structure: StructureResolver = (
    S: StructureBuilder
) => S
    .list()
    .title('Document Types')
    .items(
        [
          ...singletonTypes.entries()
              .map(
                  ([key, value]) =>
                      S.listItem()
                          .title(value)
                          .id(key)
                          .child(S.document().schemaType(key).documentId(key))
              ),
          ...S.documentTypeListItems()
              .filter(
                  listItem => [
                    'module',
                    'skater_number',
                    'training_plan'
                  ].includes(listItem.getId()!)
            ),
        ],
    );