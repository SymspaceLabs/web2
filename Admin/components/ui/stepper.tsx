// components/ui/stepper.tsx

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  number: number
  name: string
}

type StepperProps = {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep > step.number
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.number
                      ? "border-primary text-primary"
                      : "border-muted text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              
              {/* Step Name */}
              <span
                className={cn(
                  "text-xs mt-2 font-medium text-center",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2 transition-colors",
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}