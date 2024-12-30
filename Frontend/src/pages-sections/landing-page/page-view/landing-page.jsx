/**
 * LandingPageView Component
 *
 * This component serves as the main layout for the landing page of the application.
 * It incorporates multiple sections imported from local custom section components.
 * Each section is responsible for rendering a specific part of the landing page,
 * such as the hero section, carousel, 3D model, and statistics.
 *
 * Structure:
 * - Hero Section: Highlights the main feature or attraction.
 * - Application Section: Introduces the core application.
 * - Carousel Section: Displays a rotating showcase.
 * - Bento Box Section: Organized information layout.
 * - SYM AI Section: Highlights AI features.
 * - 3D Model Section: Interactive or visual 3D models.
 * - Statistics Section: Highlights key performance metrics.
 * - Product Section: Showcases products or services.
 *
 * Usage:
 * Simply include this component to render the landing page view.
 */

import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";
import Section11 from "../section-11";
import Section12 from "../section-12";
import Section13 from "../section-13";
import Section14 from "../section-14";


export default function LandingPageView() {
  return <div className="bg-white">

      <Section1 />   {/* Hero section */}
      <Section2 />   {/* Future of Retail */}
      <Section3 />   {/* Application */}
      <Section4 />   {/* Convenient & Comfortable */}
      <Section5 />   {/* Carousal section */}
      <Section6 />   {/* Realistic 3D Products */}
      <Section7 />   {/* Bento Box section */}
      <Section8 />   {/* SYM AI */}
      <Section9 />   {/* 3D Model */}
      <Section10 />  {/* Our Focus */}
      <Section11 />  {/* Statistics */}
      <Section12 />  {/* Products */}
      <Section13 />  {/* Testimonial */}
      <Section14 />  {/* Banner */}
      
    </div>;
}