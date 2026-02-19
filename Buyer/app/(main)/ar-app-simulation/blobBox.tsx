"use client";

import React from "react";

export function BlobBox() {
  return (
    <>
      <div className="absolute w-[80vw] h-[80vw] sm:w-[50vw] sm:h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-100 bg-[#0366FE] animate-blob" 
           style={{ filter: 'blur(125px)' }} 
      />
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        :global(.animate-blob) {
          animation: blob 7s infinite;
        }
      `}</style>
    </>
  );
}

export default BlobBox;