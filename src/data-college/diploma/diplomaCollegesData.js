// Listing data for the /diploma college finder — DERIVED from COLLEGES_DETAIL
// (gpaData.js), which is the single source of truth for diploma college data.
// Do NOT duplicate college facts here; edit gpaData.js instead.
//
// Shape consumed by the listing card (CollegeCard in diploma.js) and the
// ItemList schema (app/diploma/page.js):
//   { id, name, type, city, state, image, fees, placementRate, avgPackageLPA,
//     courses: [{ name, seats, cutoffRank }] }
// - fees = total 1st-year fee for the General category (fees.categoryWise[0])
// - fees / placement / cutoff values are indicative placeholders maintained in
//   gpaData.js — replace with verified JCECEB figures before publishing.

import { COLLEGES_DETAIL } from './gpaData';

const toSrc = img => (typeof img === 'string' ? img : img?.src || '');

// Explicit display order for the listing (formerly the manual `rank` field).
const ID_ORDER = [
  'gp-adityapur',
  'gp-dhanbad',
  'gp-ranchi',
  'gwp-jamshedpur',
  'gwp-ranchi',
  'gwp-bokaro',
  'gp-bokaro',
  'gp-nirsa',
  'gp-bhaga',
  'gp-dumka',
  'gp-koderma',
  'gp-latehar',
  'gp-kharsawan',
];

const COLLEGES = ID_ORDER
  .filter(id => COLLEGES_DETAIL[id])
  .map(id => {
    const d = COLLEGES_DETAIL[id];
    return {
      id: d.id || id,
      name: d.name,
      type: d.type,
      city: d.city,
      state: d.state,
      image: toSrc(d.image),
      fees: d.fees?.categoryWise?.[0]?.total || 0,
      placementRate: d.placementRate || 0,
      avgPackageLPA: d.avgPackageLPA || 0,
      courses: (d.courses || []).map(c => ({
        name: c.code || c.name,
        seats: c.seats || 0,
        cutoffRank: c.cutoffRank || 0,
      })),
    };
  });

export default COLLEGES;
