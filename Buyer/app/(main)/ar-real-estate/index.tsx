import { BlobBox } from '@/components/blobBox';
import Section1 from './section-1';
import Section2 from './section-2';
import Section3 from './section-3';
import Section4 from './section-4';
import Section5 from './section-5';
import Section6 from './section-6';
import Section7 from './section-7';

// ===================================================
// Main Page Component
// ===================================================
export default function ArRealEstatePage() {
  return (
    <div className="relative overflow-hidden bg-[#1F1F1F]">
      {/* GRADIENT CIRCLES */}
      <BlobBox top="0" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="0" left="-10%" background="#0366FE" />
      
      <BlobBox top="15%" right="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="15%" right="-10%" background="#0366FE" />
      
      <BlobBox top="25%" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="25%" left="-10%" background="#0366FE" />
      
      <BlobBox top="35%" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="35%" left="-10%" background="#0366FE" />
      
      <BlobBox top="50%" right="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="50%" right="-10%" background="#0366FE" />
      
      <BlobBox top="65%" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="65%" left="-10%" background="#0366FE" />
      
      <BlobBox top="75%" right="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="75%" right="-10%" background="#0366FE" />
      
      <BlobBox top="90%" left="0" background="#FFF" displayNoneMobile={true} />
      <BlobBox top="90%" left="-10%" background="#0366FE" />

      {/* CONTENT */}
      <div className="flex flex-col items-center w-full">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </div>
    </div>
  );
}