"use client"

/**
 * ArForBusinessPageView Component
 *
 * This component renders the "AR for Business" page view, comprising multiple sections:
 * - Section1: Hero section showcasing the main headline and introduction.
 * - Section2: Company details or offerings.
 * - Section3: Statistics or metrics highlighting key achievements.
 * - Section4: Benefits of using AR for business.
 * - Section5: Pricing information for AR services.
 * - Section6: Banner for call-to-action or promotional content.
 *
 * The component uses the "use client" directive to enable client-side rendering.
 *
 * @returns {JSX.Element} Rendered "AR for Business" page view
 */

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";

export default async function ArForBusinessPageView() {
  return (
    <div className="bg-white">
      <Section1 /> {/* HERO  */}
      <Section2 /> {/* COMPANY */}
      <Section3 /> {/* STATS */}
      <Section4 /> {/* BENEFITS */}
      <Section5 /> {/* PRICING */}
      <Section6 /> {/* BANNER */}
    </div>
  );
}