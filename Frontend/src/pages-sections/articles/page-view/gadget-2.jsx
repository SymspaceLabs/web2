"use client";

import Section1 from "../section-1";
import { useState, useEffect } from "react";

export default function GadgetTwoPageView({ slug }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (slug) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/slug/${slug}`,
            {
              method: "GET",
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setArticle(data);
          } else {
            console.error("Failed to fetch article:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div className="bg-white">
      <Section1 article={article} />
    </div>
  );
}
