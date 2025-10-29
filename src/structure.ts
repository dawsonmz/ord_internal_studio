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
    return S
        .list()
        .title('Documents')
        .items([
          orderableDocumentListDeskItem({ type: 'season', title: 'Seasons', S, context }),
          S.listItem().title('Modules').child(S.documentTypeList('module_category').title('Modules')),
          S.listItem()
              .title('Training Plans')
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
                                        .title(`${season.name} Training Plans`)
                                        .apiVersion(SANITY_CLIENT_API_VERSION)
                                        .filter('_type == "training_plan" && season._ref == $season_id')
                                        .params({ season_id: season._id })
                                )
                        ),
                        S.divider(),
                        S.listItem()
                            .title('No Season')
                            .child(
                                S.documentList()
                                        .title(`Training Plans (No Season)`)
                                        .apiVersion(SANITY_CLIENT_API_VERSION)
                                        .filter('_type == "training_plan" && season == null')
                            ),
                      ])
              ),
            S.listItem().title('Skater Numbers').child(S.documentTypeList('skater_number').title('Skater Numbers')),
            S.listItem().title('Rosters').child(S.documentTypeList('roster').title('Rosters')),
            S.listItem().title('Footage').child(S.documentTypeList('footage').title('Footage')),
        ]);
};
