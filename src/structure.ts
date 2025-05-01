import type { StructureBuilder, StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (
    S: StructureBuilder
) => S
    .list()
    .title('Document Types')
    .items([...S.documentTypeListItems()]);