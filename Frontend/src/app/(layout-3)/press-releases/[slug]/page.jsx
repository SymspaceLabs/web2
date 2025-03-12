import ArticleDetailsPageView from "@/pages-sections/article-details/page-view";

export const metadata = {
  title: "Press Releases",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Article({params}) {
  return <ArticleDetailsPageView slug={params.slug} />;
}