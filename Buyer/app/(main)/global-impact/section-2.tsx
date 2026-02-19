"use client";

import { useEffect, useState, useRef } from 'react';

export default function Section2() {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {blogs.map(blog => (
            <div key={blog.id}>
              <BlogCard date={blog.createdAt} title={blog.count} subTitle={blog.subTitle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const blogs = [
  {
    id: "1",
    count: 68,
    subTitle: "Pregnant Women Prefer Online Shopping for Convenience",
    createdAt: ""
  }, 
  {
    id: "2",
    count: 66,
    subTitle: "Shoppers are Interested in Using AR for Shopping Assistance",
    createdAt: ""
  }, 
  {
    id: "3",
    count: 50,
    subTitle: "Persons with Disabilities Shop Online for Physical Products at least Once a Week",
    createdAt: ""
  }
];

interface BlogCardProps {
  title: number;
  subTitle: string;
  date?: string;
}

function BlogCard({ title, subTitle }: BlogCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(title.toString(), 10);
    const duration = 2000;
    const incrementTime = 10;
    const incrementValue = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += incrementValue;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, title]);

  return (
    <div 
      ref={cardRef} 
      className="p-5 flex flex-row sm:flex-col items-center justify-center sm:h-[400px] bg-gradient-to-br from-white/50 via-[rgba(235,235,235,0.367)] to-[rgba(196,196,196,0.1)] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[10px] rounded-[30px] gap-3"
    >
      {/* Title */}
      <h1 className="font-elemental text-[30px] sm:text-[96px] text-white text-center">
        {count}%
      </h1>

      {/* Subtitle */}
      <p className="font-helvetica text-sm sm:text-2xl text-white text-center">
        {subTitle}
      </p>
    </div>
  );
}