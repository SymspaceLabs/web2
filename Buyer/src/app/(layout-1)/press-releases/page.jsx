import ArticlesPageView from "@/pages-sections/articles/page-view";

export const metadata = {
  title: "Press Releases",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Articles() {
  return <ArticlesPageView />;
}