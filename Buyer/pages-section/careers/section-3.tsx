"use client"

// ==============================================================
// Section 3 || Careers Page
// ==============================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

// ==============================================================

interface Job {
  id: string;
  title: string;
  location: string;
}

interface JobCardProps {
  job: Job;
}

export default function Section3() {
  const [isMobile, setIsMobile] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      let locationFilter = "";
  
      if (selectedLocation.length > 0 && !selectedLocation.includes("All Locations")) {
        locationFilter = `&location=${encodeURIComponent(selectedLocation.join("|"))}`;
      } else {
        locationFilter = "";
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs?search=${encodeURIComponent(searchQuery)}${locationFilter}`
      );
  
      const jobsData = await response.json();
      setFilteredJobs(jobsData);
    };
  
    fetchJobs();
  }, [searchQuery, selectedLocation]);
  

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`);
      const jobs: Job[] = await response.json(); // Add type annotation here
    
      const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
    
      setAllLocations(uniqueLocations);
    };
    fetchLocations();
  }, []);

  const handleLocationToggle = (location: string) => {
    if (location === "All Locations") {
      setSelectedLocation([]);
    } else {
      setSelectedLocation((prev) =>
        prev.includes(location)
          ? prev.filter((loc) => loc !== location)
          : [...prev, location]
      );
    }
  };

  return (
    <div id="open-roles" className="py-2 sm:py-10">
      <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-between w-full py-5 gap-2`}>
          <h1 className="font-elemental text-[25px] sm:text-[35px] text-white">
            open roles
          </h1>
          <div className={`flex gap-2 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <Input
                type="text"
                placeholder="Job title, skill, keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-helvetica w-full sm:w-auto pl-12 pr-4 py-3 rounded-[25px] bg-white text-black outline-none"
              />
            </div>

            {/* Location Dropdown */}
            <div className="relative min-w-[150px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black w-5 h-5 z-10 pointer-events-none" />
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full min-w-[250px] pl-12 pr-4 py-3 rounded-[25px] bg-white text-black text-left outline-none flex items-center justify-between"
              >
                <span className="truncate">
                  {selectedLocation.length ? selectedLocation.join(", ") : "All Locations"}
                </span>
                <span className="ml-2">▼</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  <div
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationToggle("All Locations")}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocation.length === 0}
                      onChange={() => {}}
                      className="mr-3"
                    />
                    <span>All Locations</span>
                  </div>
                  {allLocations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleLocationToggle(location)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocation.includes(location)}
                        onChange={() => {}}
                        className="mr-3"
                      />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

const JobCard = ({ job }: JobCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/careers/${job.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white/35 backdrop-blur-[10px] rounded-[30px] p-8 w-full h-auto sm:h-[200px] flex flex-col overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
      style={{
        boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                    inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                    inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                    inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`
      }}
    >
      <p className="uppercase text-white text-base py-1">
        {job.location}
      </p>
      <div className="border-t border-white/30 my-2"></div>
      <h2 className="font-elemental lowercase text-white text-lg py-2 flex-grow">
        {job.title}
      </h2>
      <div className="flex justify-end">
        <ArrowRight className="text-white w-6 h-6" />
      </div>
    </div>
  );
};