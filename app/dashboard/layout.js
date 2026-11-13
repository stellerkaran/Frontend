// The dashboard is personal (it reads ?userId / ?userName and the viewer's own
// session), so it must never be prerendered: Next.js bails out of static
// generation with "useSearchParams() should be wrapped in a suspense boundary"
// — and a cached shell would be wrong anyway. Rendering it per request keeps
// the query-string view working while still server-rendering the markup.
export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }) {
  return children;
}
