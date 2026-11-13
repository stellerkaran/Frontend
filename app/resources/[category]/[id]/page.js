import ResourceSubpage, { resourcesDb } from "./ResourceSubpageClient";

/**
 * This route serves pure static content (the hardcoded `resourcesDb` object),
 * but it used to be rendered on demand for every request - a "Dynamic" route in
 * the build output. That meant each hit cost a Function invocation plus a full
 * HTML render, all of which counts against Fast Origin Transfer.
 *
 * `generateStaticParams` pre-renders every known category/id pair at build
 * time, so these pages are served straight from the CDN with no origin work.
 *
 * `dynamicParams = false` makes unknown slugs 404 at the edge instead of
 * invoking a Function. That matches the previous behaviour: the client
 * component could only ever render its "Resource not found" screen for them,
 * which the global not-found page now handles instead.
 *
 * Rendered markup is unchanged - ResourceSubpageClient still owns all of the
 * UI, the search box and the download state.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.entries(resourcesDb).flatMap(([category, entries]) =>
    Object.keys(entries).map((id) => ({ category, id }))
  );
}

export default async function Page({ params }) {
  const { category, id } = await params;
  return <ResourceSubpage category={category} id={id} />;
}