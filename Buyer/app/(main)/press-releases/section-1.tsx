"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft, ChevronRight } from "lucide-react"; // Replaced MUI icons with standard lucide-react or similar
import { H1 } from "@/components/Typography";
import Image from "next/image";
import { Article } from "@/types/article";

export default function Section1() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?search=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchQuery]);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = blogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  return (
    <div className="flex flex-col items-center py-8 sm:py-20 pt-[100px] sm:pt-[100px] md:pt-[200px]">
      <div className="flex flex-col items-center max-w-[1400px] w-full px-4 sm:px-0">
        
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between w-full py-12 gap-4 items-center">
          <H1 className="text-[25px] sm:text-[50px] text-white">
            Press Releases
          </H1>
          
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-black h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Job title, skill, keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-white text-black rounded-[25px] border-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {currentBlogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-row justify-center items-center py-20 gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="disabled:opacity-30 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ChevronLeft className="text-white h-6 w-6" />
                </button>
                <span className="text-white text-[18px]">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-30 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ChevronRight className="text-white h-6 w-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

interface BlogCardProps {
  blog: Article;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const router = useRouter();

  return (
    <div 
      className="bg-white/35 backdrop-blur-[10px] rounded-[40px] p-[25px] w-full h-[500px] flex flex-col gap-3"
      style={{
        boxShadow: `inset 0px 3px 6px rgba(255, 255, 255, 0.4),
                    inset 0px -3px 9px rgba(255, 255, 255, 0.5),
                    inset 0px -1.5px 20px rgba(255, 255, 255, 0.24),
                    inset 0px 20px 20px rgba(255, 255, 255, 0.24),
                    inset 0px 1px 20.5px rgba(255, 255, 255, 0.8)`
      }}
    >
      <div className="h-[200px] overflow-hidden flex justify-center items-center rounded-[20px]">
        <Image 
          src={blog.image || ''} 
          width={500} 
          height={500} 
          alt="blog-image" 
          className="h-[200px] w-full object-cover" 
        />
      </div>

      <p className="font-semibold text-white font-['Helvetica'] text-[20px] py-1">
        {blog.handle_url_title}
      </p>

      <div className="border-b border-white/20 w-full" />

      <p className="text-white font-['Helvetica'] text-[18px] py-1 font-medium truncate">
        {blog.title}
      </p>

      <p className="text-white font-['Helvetica'] text-[18px] italic font-light line-clamp-3 overflow-hidden">
        {blog.content}
      </p>

      <div className="flex justify-end pt-5 mt-auto">
        <button 
          onClick={() => router.push(`/press-releases/${blog.slug}`)}
          className="font-elemental lowercase text-[10px] px-6 py-2 bg-transparent border-2 border-white rounded-[50px] text-white font-normal shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-black transition-all duration-300"
        >
          Read More
        </button>
      </div>
    </div>
  );
};