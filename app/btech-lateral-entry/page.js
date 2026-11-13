import BtechLe from '@/src/data-college/btech-le/btechLe';
import { getBtechLeListingMetadata, viewport as btechLeViewport } from './metadata';

export const viewport = btechLeViewport;

// The listing page had no server metadata at all: the og:* tags were only ever
// written client-side, so crawlers that skip JS saw no OG data. This serves them.
export function generateMetadata() {
  return getBtechLeListingMetadata();
}

export default function Page() {
  return <BtechLe />;
}
