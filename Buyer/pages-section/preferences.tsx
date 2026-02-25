"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard, Loader2 } from "lucide-react";
import PreferenceForm from "@/components/forms/preference";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

interface PreferencesData {
  gender?: string;
  styles: string[];
  fits: string[];
  colors: string[];
  brands: string[];
  tops: string[];
  bottoms: string[];
  outerwears: string[];
  accessories: string[];
}

interface PreferencesPageProps {
  isEdit?: boolean;
}

export default function PreferencesPage({
  isEdit = false,
}: PreferencesPageProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [preferences, setPreferences] = useState<PreferencesData>({
    gender: undefined,
    styles: [],
    fits: [],
    colors: [],
    brands: [],
    tops: [],
    bottoms: [],
    outerwears: [],
    accessories: [],
  });

  const updatePreference = <K extends keyof PreferencesData>(
    key: K,
    value: PreferencesData[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user?.id) return;

      setFetching(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`,
          { credentials: "include" }
        );

        // No preferences exist yet for this user — silently keep defaults
        if (res.status === 404) return;

        if (!res.ok) throw new Error("Failed to fetch preferences");

        const data = await res.json();
        const pref = data.preference; 

        setPreferences({
          gender: pref.gender,
          styles: pref.styles || [],
          fits: pref.fits || [],
          colors: pref.colors || [],
          brands: pref.brands || [],
          tops: pref.tops || [],
          bottoms: pref.bottoms || [],
          outerwears: pref.outerwears || [],
          accessories: pref.accessories || [],
        });
      } catch (error) {
        console.error("Error fetching preferences:", error);
        toast.error("Failed to load preferences.");
      } finally {
        setFetching(false);
      }
    };

    if (isAuthenticated) fetchPreferences();
  }, [isAuthenticated, user?.id]);

  const handleSave = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/preferences/user/${user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(preferences),
        }
      );

      if (!res.ok) throw new Error("Failed to save preferences");

      toast.success("Preferences saved successfully!");
      router.push("/preferences");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pb-[15px] rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px]"
      style={{
        background:
          "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      <SymDashboardHeader
        title="Preferences"
        Icon={CreditCard}
        buttonText={isEdit ? "Save Changes" : "Edit"}
        onClick={isEdit ? handleSave : () => router.push("/preferences/edit")}
        loading={loading}
      />

      <div className="p-[15px]">
        <div
          className="w-full text-white flex flex-wrap p-6 mt-6 rounded-[15px] items-start sm:items-center justify-start sm:justify-between"
          style={{
            background:
              "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
          }}
        >
          {fetching ? (
            <div className="flex justify-center items-center w-full py-10">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : (
            <PreferenceForm
              gender={preferences.gender}
              setGender={(val: string) => updatePreference("gender", val)}
              styles={preferences.styles}
              setStyles={(val: string[]) => updatePreference("styles", val)}
              fits={preferences.fits}
              setFits={(val: string[]) => updatePreference("fits", val)}
              colors={preferences.colors}
              setColors={(val: string[]) => updatePreference("colors", val)}
              brands={preferences.brands}
              setBrands={(val: string[]) => updatePreference("brands", val)}
              tops={preferences.tops}
              setTops={(val: string[]) => updatePreference("tops", val)}
              bottoms={preferences.bottoms}
              setBottoms={(val: string[]) => updatePreference("bottoms", val)}
              outerwears={preferences.outerwears}
              setOuterwears={(val: string[]) =>
                updatePreference("outerwears", val)
              }
              accessories={preferences.accessories}
              setAccessories={(val: string[]) =>
                updatePreference("accessories", val)
              }
              isEdit={isEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}