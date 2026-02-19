"use client";

import { BlobBox } from "@/components/blobBox";
import { useEffect } from "react";
import { Section1 } from "./section-1";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Section4 from "./section-4";
import Section5 from "./section-5";
import Section6 from "./section-6";


// Main Page View Component
export default function SellOnSymspacePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* GRADIENT CIRCLES */}
      <BlobBox top="1%" right={-150} background="#0366FE" />
      <BlobBox top="0.5%" left={-250} background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top="15%" right={-50} background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top="15%" left={-200} background="#0366FE" />
      <BlobBox top="28%" left={650} background="#0366FE" widthHeight="20vw" />
      <BlobBox top="30%" left={300} widthHeight="20vw" background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top="40%" right={100} background="#0366FE" widthHeight="60vw" />
      <BlobBox top="60%" left={850} background="rgba(147, 63, 254, 0.5)" />
      <BlobBox top="80%" left={30} background="#0366FE" widthHeight="80vw" />
      <BlobBox top="80%" right={-50} background="rgba(147, 63, 254, 0.5)" widthHeight="80vw" />

      {/* CONTENT */}
      <div className="relative z-[2]">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>

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
    </div>
  );
}