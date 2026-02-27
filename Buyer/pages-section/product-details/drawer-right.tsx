"use client"

// ==============================================================
// DrawerRight — Personalized Sizing Drawer
// Faithful Tailwind port of the MUI DrawerRight component.
// Uses the same MeasurementForm + PreferenceForm sub-components.
// ==============================================================

import Link from "next/link"
import { toast } from "sonner"
import { X, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useCallback, useState, useEffect } from "react"
import PreferenceForm from "@/components/forms/preference"
import MeasurementForm from "@/components/forms/measurement"

// ── Types ────────────────────────────────────────────────────────

interface HeightState { feet: number; inches: number; cm: number }
interface WeightState { lbs: number; kg: number }

interface DrawerRightProps {
  onClose:      () => void
  headerTitle?: string
}

// ── Component ────────────────────────────────────────────────────

export default function DrawerRight({ onClose, headerTitle = "personalized sizing" }: DrawerRightProps) {
  const { isAuthenticated, user } = useAuth() as any
  const { push } = useRouter()

  // ── Measurement state ────────────────────────────────────────
  const [isMetric, setIsMetric] = useState(true)
  const [height,   setHeight]   = useState<HeightState>({ feet: 0, inches: 0, cm: 0 })
  const [weight,   setWeight]   = useState<WeightState>({ lbs: 0, kg: 0 })
  const [chest,    setChest]    = useState(0)
  const [waist,    setWaist]    = useState(0)

  // ── Preference state ─────────────────────────────────────────
  const [gender,      setGender]      = useState<string>("")
  const [stylesData,  setStylesData]  = useState<string[]>([])
  const [fits,        setFits]        = useState<string[]>([])
  const [colors,      setColors]      = useState<string[]>([])
  const [brands,      setBrands]      = useState<string[]>([])
  const [tops,        setTops]        = useState<string[]>([])
  const [bottoms,     setBottoms]     = useState<string[]>([])
  const [outerwears,  setOuterwears]  = useState<string[]>([])
  const [accessories, setAccessories] = useState<string[]>([])

  const [saving, setSaving] = useState(false)

  // ── Fetch existing onboarding data ───────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return
    const fetchMeasurements = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const { measurement, preference } = await res.json()

        setHeight({
          cm:     measurement.height,
          feet:   Math.floor(measurement.height / 30.48),
          inches: Math.round((measurement.height % 30.48) / 2.54),
        })
        setWeight({
          kg:  measurement.weight,
          lbs: Math.round(measurement.weight * 2.20462),
        })
        setIsMetric(measurement.metric ?? true)
        setChest(measurement.chest ?? 0)
        setWaist(measurement.waist ?? 0)
        setGender(preference.gender      ?? "")
        setStylesData(preference.styles  ?? [])
        setFits(preference.fits          ?? [])
        setColors(preference.colors      ?? [])
        setBrands(preference.brands      ?? [])
        setTops(preference.tops          ?? [])
        setBottoms(preference.bottoms    ?? [])
        setOuterwears(preference.outerwears ?? [])
        setAccessories(preference.accessories ?? [])
      } catch (err) {
        console.error("Error fetching measurements:", err)
      }
    }
    fetchMeasurements()
  }, [isAuthenticated, user?.id])

  // ── Save handler ─────────────────────────────────────────────
  const handleSaveChanges = async () => {
    setSaving(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding/user/${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            measurement: { weight: weight.kg, height: height.cm, isMetric, chest, waist },
            preference:  {
              gender, tops, bottoms, outerwears, accessories,
              styles: stylesData, fits, brands, colors,
            },
          }),
        }
      )
      if (response.status === 201) {
        toast.success("Info updated successfully")
      } else {
        throw new Error(`Unexpected status: ${response.status}`)
      }
    } catch (err) {
      console.error("Error saving onboarding:", err)
      toast.error("Failed to save changes")
    } finally {
      setSaving(false)
    }
  }

  // ── Navigate + close ─────────────────────────────────────────
  const handleNavigate = useCallback(
    (path: string) => { push(path); onClose() },
    [push, onClose],
  )

  return (
    <div className="flex flex-col h-full w-full">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{
          background:   "linear-gradient(94.91deg, #858585 0%, #353535 100%)",
          borderRadius: "15px 0 0 0",
        }}
      >
        <h2 className="font-elemental lowercase text-white text-lg tracking-wide">
          {headerTitle}
        </h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close drawer"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* ── Scrollable Content ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-5 py-5">

        {isAuthenticated ? (

          // ── Post-auth: measurement + preference forms ──────
          <div className="flex flex-col gap-6 pb-4">
            <p className="text-sm text-[#353535]/70">
              Welcome back! Complete the details below for personalised recommendations.
            </p>

            <MeasurementForm
              isMetric={isMetric}
              setIsMetric={setIsMetric}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              chest={chest}
              setChest={setChest}
              waist={waist}
              setWaist={setWaist}
              isMobile={false}
              sidebar
            />

            <div className="border-t border-[#353535]/10" />

            <PreferenceForm
              gender={gender}
              setGender={setGender}
              styles={stylesData}
              setStyles={setStylesData}
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
              sidebar
              isEdit
            />
          </div>

        ) : (

          // ── Pre-auth: sign-in prompt ───────────────────────
          <div className="flex flex-col gap-5 pt-4">
            <p className="text-sm text-[#353535]/70">
              Complete the details below so we can offer better-tailored and
              personalised services.
            </p>
            <h3 className="text-lg font-bold text-[#353535]">
              To access personalized sizing features
            </h3>
            <button
              onClick={() => handleNavigate("/sign-in")}
              className="w-full py-3 rounded-full border-2 border-[#353535] bg-transparent text-[#353535] font-semibold text-sm transition-all hover:bg-[#353535] hover:text-white"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavigate("/signup")}
              className="w-full py-3 rounded-full bg-[#0366FE] text-white font-semibold text-sm transition-all hover:bg-[#0250cc]"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* ── Footer (authenticated only) ────────────────────── */}
      {isAuthenticated && (
        <div className="flex-shrink-0 px-5 py-4 border-t border-[#353535]/10 flex flex-col items-center gap-3">
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0366FE] text-white font-semibold text-sm transition-all hover:bg-[#0250cc] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save Settings
          </button>

          <Link
            href="/contact-us"
            className="text-xs text-[#353535]/50 hover:text-[#353535] hover:underline transition-colors font-helvetica"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  )
}