import { type SanityClient, useClient } from 'sanity';
import type { StructureBuilder, StructureResolver, StructureResolverContext } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

const SANITY_CLIENT_API_VERSION = '2025-04-15';

let sanityClient: SanityClient | null = null;

function getSanityClient(): SanityClient {
  if (!sanityClient) {
    sanityClient = useClient({ apiVersion: SANITY_CLIENT_API_VERSION }).withConfig({ perspective: 'raw' });
  }
  return sanityClient;
}

export const structure: StructureResolver = async (
    S: StructureBuilder,
    context: StructureResolverContext,
) => {
    const seasons = await getSanityClient().fetch(`*[_type == "season"] | order(orderRank asc) { _id, name }`);
    const beginnersModuleTags = await getSanityClient()
        .fetch(`*[_type == "module_tag" && module_type == "beginners"] | order(orderRank asc) { _id, name }`);

    return S
        .list()
        .title('Documents')
        .items([
          orderableDocumentListDeskItem({ type: 'season', title: 'Seasons', S, context }),
          S.listItem()
              .title('Module Tags')
              .child(
                  S.list()
                      .title('Module Tag Types')
                      .items([
                        orderableDocumentListDeskItem({
                          type: 'module_tag',
                          id: `module_tag_beginners`,
                          title: 'Beginners',
                          filter: '_type == "module_tag" && module_type == "beginners"',
                          S,
                          context,
                        }),
                      ]),
              ),
          S.listItem()
              .title('Modules')
              .child(
                  S.list()
                      .title('Module Types')
                      .items([
                        S.listItem()
                            .title('Beginners')
                            .child(
                                S.list()
                                    .title('Beginners Module Tags')
                                    .items([
                                      ...beginnersModuleTags.map(
                                          (moduleTag: any) =>
                                              orderableDocumentListDeskItem({
                                                type: 'module',
                                                id: `module-${moduleTag._id}`,
                                                title: moduleTag.name,
                                                filter: '_type == "module" && main_tag._ref == $module_tag_id',
                                                params: { module_tag_id: moduleTag._id },
                                                S,
                                                context,
                                              })
                                      ),
                                      S.divider(),
                                      S.listItem()
                                          .title('Missing Main Tag')
                                          .child(
                                              S.documentList()
                                                  .title('Modules Missing Main Tag')
                                                  .apiVersion(SANITY_CLIENT_API_VERSION)
                                                  .filter('_type == "module" && main_tag == null')
                                          )
                                    ])
                            )
                            
                      ])
              ),
          S.listItem()
              .title('Beginners Training Plans')
              .child(
                  S.list()
                      .title('Seasons')
                      .items([
                        ...seasons.map(
                            (season: any) => S
                                .listItem()
                                .title(season.name)
                                .child(
                                    S.documentList()
                                        .title(`${season.name} Beginners`)
                                        .apiVersion(SANITY_CLIENT_API_VERSION)
                                        .filter('_type == "training_plan" && type == "beginners" && season._ref == $season_id')
                                        .params({ season_id: season._id })
                                )
                        ),
                        S.divider(),
                        S.listItem()
                            .title('Missing Season')
                            .child(
                                S.documentList()
                                    .title('Training Plans Missing Season')
                                    .apiVersion(SANITY_CLIENT_API_VERSION)
                                    .filter('_type == "training_plan" && season == null')
                            ),
                      ])
              ),
          S.listItem().title('Skater Numbers').child(S.documentTypeList('skater_number').title('Skater Numbers')),
          S.listItem().title('Rosters').child(S.documentTypeList('roster').title('Rosters')),
          S.listItem()
              .title('Footage')
              .child(
                  S.list()
                      .title('Seasons')
                      .items([
                        ...seasons.map(
                            (season: any) =>
                                orderableDocumentListDeskItem({
                                    type: 'footage',
                                    id: `footage-${season._id}`,
                                    title: season.name,
                                    filter: '_type == "footage" && season._ref == $season_id',
                                    params: { season_id: season._id },
                                    S,
                                    context,
                                })
                        ),
                        S.divider(),
                        S.listItem()
                            .title('Missing Season')
                            .child(
                                S.documentList()
                                    .title('Footage Missing Season')
                                    .apiVersion(SANITY_CLIENT_API_VERSION)
                                    .filter('_type == "footage" && season == null')
                            ),
                      ])
              ),
        ]);
};
