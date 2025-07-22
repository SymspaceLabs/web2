import ArticleDetailsPageView from "@/pages-sections/article-details/page-view";

export const metadata = {
  title: "Press Releases",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Article({params}) {
  return <ArticleDetailsPageView slug={params.slug} />;
}