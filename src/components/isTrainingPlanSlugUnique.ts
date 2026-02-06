export async function isTrainingPlanSlugUnique(slug: any, context: any) {
  const { document, getClient } = context;
  const sanityClient = getClient({ apiVersion: '2025-04-15' }).withConfig({ perspective: 'published' });

  if (!slug || !(document?.season)) {
    return true;
  }

  const count = await sanityClient.fetch(
      `count(*[ _type == $type && slug.current == $slug && season._ref == $season_ref && _id != $id ])`,
      {
        type: document._type,
        slug,
        season_ref: document.season._ref,
        id: document._id.replace(/^drafts\./, ''),
      },
  );
  return count == 0;
}
