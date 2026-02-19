"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner"; // Using shadcn/ui sonner
import { Card, CardContent } from "@/components/ui/card";
import MeasurementForm from "@/components/forms/measurement";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";
import { User } from "lucide-react";

// Define interfaces for TypeScript
interface Height {
  feet: number;
  inches: number;
  cm: number;
}

interface Weight {
  lbs: number;
  kg: number;
}

interface MeasurementPagerops {
  isEdit?: boolean;
}

export default function MeasurementPage({ isEdit = true }: MeasurementPagerops) {
  const { isAuthenticated, user, token } = useAuth();
  const router = useRouter();

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

  const [chest, setChest] = useState<number | undefined>();
  const [waist, setWaist] = useState<number | undefined>();

  const handleSaveChanges = async () => {
    if (!user) return;

    const requestBody = {
      height: height.cm,
      weight: weight.kg,
      chest: chest,
      waist: waist,
      isMetric: isMetric,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Using sonner toast
      toast.success(response.data.message || "Changes saved successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Error saving changes";
      console.error("Error saving changes:", error.response?.data || error.message);
      
      // Using sonner toast for error
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchMeasurements = async () => {
      if (!user) return;
      
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`
        );
        const { data } = response;

        setHeight({
          cm: data.height,
          feet: Math.floor(data.height / 30.48),
          inches: Math.round((data.height % 30.48) / 2.54),
        });
        setWeight({
          kg: data.weight,
          lbs: Math.round(data.weight * 2.20462),
        });
        setIsMetric(data?.isMetric);
        setChest(data.chest);
        setWaist(data.waist);
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };

    if (isAuthenticated) fetchMeasurements();
  }, [isAuthenticated, user]);

  const handleSave = async () => {
    if (!user) return; 
    
      const requestBody = {
        height: height.cm,
        weight: weight.kg,
        chest: chest,
        waist: waist,
        isMetric: isMetric,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/measurements/user/${user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        router.push('/measurements'); // After successful login

      } catch (error) {
        console.error("Error saving changes:", error);
      }
    };

  return (
    <div className="pb-[15px] rounded-[15px] bg-gradient-to-br from-[#B7B7B9] to-[#777777] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px]">
        <SymDashboardHeader
          title={isEdit ? "Edit Measurement" : "Measurement"}
          Icon={User}
          buttonText={isEdit? "Save Changes" : "Edit"}
          onClick={isEdit? handleSave : ()=>router.push('/measurements/edit')}
        />
        <div className="p-5">
            <Card className="w-full rounded-[15px] text-white p-6 flex flex-col items-center justify-between bg-gradient-to-br from-white/50 via-[#ebebeb]/36 to-[#c4c4c4]/10 sm:items-start sm:flex-row sm:justify-start">
                <CardContent className="w-full p-0">
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
                      isEdit={isEdit}
                      isMobile={false}
                    />
                </CardContent>
            </Card>
        </div>

    </div>
  );
}
