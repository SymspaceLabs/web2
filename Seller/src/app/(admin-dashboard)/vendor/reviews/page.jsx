import { ReviewsPageView } from "../../../../pages-sections/vendor-dashboard/reviews/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Reviews",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default async function Reviews() {
  return <ReviewsPageView reviews={[]} />;
}