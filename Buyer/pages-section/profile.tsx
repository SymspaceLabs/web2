"use client";

import { toast } from "sonner";
import { User } from "lucide-react";
import { uploadFile } from "@/api/upload";
import { fetchUserById } from "@/api/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserAnalytics from "@/components/user-analytics";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";
// import { ProfileForm, MeasurementForm, PreferenceForm } from "@/components/custom-forms";
import ProfileForm from "@/components/forms/profile";
import MeasurementForm from "@/components/forms/measurement";
import PreferenceForm from "@/components/forms/preference";

// ==============================================================
// Type Definitions
// ==============================================================
interface Height {
  feet: number;
  inches: number;
  cm: number;
}

interface Weight {
  lbs: number;
  kg: number;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  avatar?: string;
  measurement?: {
    isMetric?: boolean;
    height?: number;
    weight?: number;
    chest?: number;
    waist?: number;
  };
  preference?: {
    gender?: string;
    tops?: string[];
    bottoms?: string[];
    outerwears?: string[];
    accessories?: string[];
    styles?: string[];
    fits?: string[];
    brands?: string[];
    colors?: string[];
  };
}

interface ProfilePageProps {
  isEdit: boolean;
}

// ==============================================================
// Profile Page View Component
// ==============================================================
export default function ProfilePage({ isEdit }: ProfilePageProps) {
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width:600px)').matches;
  
  const { isAuthenticated, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // PROFILE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  // MEASUREMENTS
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState<Height>({
    feet: 0,
    inches: 0,
    cm: 0,
  });
    
  const [weight, setWeight] = useState<Weight>({
    lbs: 0,
    kg: 0,
  });
    
  const [chest, setChest] = useState(0);
  const [waist, setWaist] = useState(0);

  // Preferences
  const [gender, setGender] = useState('');
  const [tops, setTops] = useState<string[]>([]);
  const [bottoms, setBottoms] = useState<string[]>([]);
  const [outerwears, setOuterwears] = useState<string[]>([]);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [fits, setFits] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  // Function to receive the file from ProfilePicUpload
  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!user?.id) return; // ← early return keeps everything below safe

    const getUserData = async () => {
      if (user?.id) {
        try {
          const data = await fetchUserById(user.id);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data in component:", error);
          toast.error("Failed to load user data.");
        }
      }
    };
  
    if (user?.id) {
      getUserData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setDob(userData.dob || '');
      setAvatarUrl(userData.avatar || '');

      const fetchedIsMetric = userData.measurement?.isMetric ?? true;
      const fetchedHeightCm = userData.measurement?.height || 0;
      const fetchedWeightKg = userData.measurement?.weight || 0;
      const fetchedChest = userData.measurement?.chest || 0;
      const fetchedWaist = userData.measurement?.waist || 0;

      setIsMetric(fetchedIsMetric);

      if (!fetchedIsMetric) {
        const totalInches = fetchedHeightCm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        setHeight({
          feet: feet,
          inches: inches,
          cm: fetchedHeightCm,
        });
      } else {
        setHeight({
          feet: Math.floor(fetchedHeightCm / 30.48),
          inches: Math.round((fetchedHeightCm / 2.54) % 12),
          cm: fetchedHeightCm,
        });
      }

      setWeight({
        kg: fetchedWeightKg,
        lbs: Math.round(fetchedWeightKg * 2.20462),
      });

      setChest(fetchedChest);
      setWaist(fetchedWaist);

      setGender(userData.preference?.gender || '');
      setTops(userData.preference?.tops || []);
      setBottoms(userData.preference?.bottoms || []);
      setOuterwears(userData.preference?.outerwears || []);
      setAccessories(userData.preference?.accessories || []);
      setStyles(userData.preference?.styles || []);
      setFits(userData.preference?.fits || []);
      setBrands(userData.preference?.brands || []);
      setColors(userData.preference?.colors || []);
    }
  }, [userData]);
  
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === undefined || user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user?.id) return;
    setLoading(true);
    let finalAvatarUrl = avatarUrl;

    try {
      if (selectedFile) {
        toast.info("Uploading new profile image...");
        const uploadResponse = await uploadFile(selectedFile);
        
        if (uploadResponse?.imageUrl) {
          finalAvatarUrl = uploadResponse.imageUrl;
          setAvatarUrl(finalAvatarUrl);
          setSelectedFile(null);
        } else {
          throw new Error("MinIO upload failed to return a valid URL.");
        }
      }
      
      const requestBody = {
        measurement: {
          weight: weight.kg,
          height: height.cm,
          isMetric: isMetric,
          chest: chest,
          waist: waist
        },
        preference: {
          gender: gender,
          tops: tops,
          bottoms: bottoms,
          outerwears: outerwears,
          accessories: accessories,
          styles: styles,
          fits: fits,
          brands: brands,
          colors: colors
        },
        user: {
          dob: dob,
          firstName: firstName,
          lastName: lastName,
          avatar: finalAvatarUrl
        }
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (res.status === 201) {
        toast.success("Profile changes saved successfully!");
        router.push("/profile/view");
      } else {
        toast.error("Failed to save changes.");
      }
      
    } catch (error) {
      console.error("Error during save operation:", error);
      toast.error("An error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <div className="flex flex-col gap-6 p-4 rounded-2xl bg-gradient-to-b from-[#B7B7B9] to-[#777777] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div>
        <SymDashboardHeader
          title={isEdit ? "Edit Profile" : "Profile"}
          Icon={User}
          buttonText={isEdit ? "Save Changes" : "Edit"}
          onClick={isEdit ? handleSave : () => router.push('/profile/edit')}
          loading={loading}
        />
        <UserAnalytics
          user={userData}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
          isEdit={isEdit}
          onFileSelect={handleFileSelection}
        />
      </div>
      
      <div className="rounded-2xl w-full text-white flex flex-wrap p-6 flex-col sm:flex-row items-start sm:items-start bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a] justify-start sm:justify-between">
        <ProfileForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={userData.email}
          dob={dob}
          setDob={setDob}
          isEdit={isEdit}
        />
      </div>
      
      <div className="rounded-2xl w-full text-white flex flex-wrap p-6 flex-col sm:flex-row items-start sm:items-start bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a] justify-start sm:justify-between">
        <MeasurementForm
          setIsMetric={setIsMetric} 
          isMetric={isMetric}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          chest={chest}
          setChest={setChest}
          waist={waist}
          setWaist={setWaist}
          isMobile={isMobile}
          isEdit={isEdit}
        />
      </div>
      
      <div className="rounded-2xl w-full text-white flex flex-wrap p-6 flex-col sm:flex-row items-start sm:items-start bg-gradient-to-br from-white/50 via-[#ebebeb5e] to-[#c4c4c41a] justify-start sm:justify-between">
        <PreferenceForm
          gender={gender}
          setGender={setGender}
          styles={styles}
          setStyles={setStyles}
          fits={fits}
          setFits={setFits}
          colors={colors}
          setColors={setColors}
          brands={brands}
          setBrands={setBrands}
          tops={tops}
          setTops={setTops}
          bottoms={bottoms}
          setBottoms={setBottoms}
          outerwears={outerwears}
          setOuterwears={setOuterwears}
          accessories={accessories}
          setAccessories={setAccessories}
          isMobile={isMobile}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
}