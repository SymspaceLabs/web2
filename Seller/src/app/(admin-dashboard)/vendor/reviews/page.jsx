import { ReviewsPageView } from "../../../../pages-sections/vendor-dashboard/reviews/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Reviews - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce"]
};
export default async function Reviews() {
  return <ReviewsPageView reviews={[]} />;
}