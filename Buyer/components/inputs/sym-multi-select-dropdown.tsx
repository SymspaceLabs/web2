"use client";

// ===============================================
// Custom Multi-select Dropdown Input
// ===============================================

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

// ===============================================

type StringOption = string;

interface ObjectOption {
  id: string;
  label: string;
  value: string;
}

type Option = StringOption | ObjectOption;

interface SymMultiSelectDropdownProps {
  title: string;
  selectedValue: string[];
  handleChange: (val: string[]) => void;
  options: Option[];
  isBrand?: boolean;
  isColor?: boolean;
  isEdit?: boolean;
}

// ===============================================

const SymMultiSelectDropdown = ({
  title,
  selectedValue,
  handleChange,
  options,
  isBrand = false,
  isColor = false,
  isEdit = false,
}: SymMultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selected = Array.isArray(selectedValue) ? selectedValue : [];

  const getKey   = (option: Option): string => typeof option === "string" ? option : option.id;
  const getLabel = (option: Option): string => typeof option === "string" ? option : option.label;
  const getColor = (option: Option): string | undefined => typeof option !== "string" ? option.value : undefined;

  const toggle = (key: string) => {
    if (!isEdit) return;
    const next = selected.includes(key)
      ? selected.filter((v) => v !== key)
      : [...selected, key];
    handleChange(next);
  };

  const displayText =
    selected.length === 0
      ? "Select options"
      : selected
          .map((key) => {
            const match = options.find((o) => getKey(o) === key);
            return match ? getLabel(match) : key;
          })
          .join(", ");

  return (
    <div className="flex flex-col flex-1 min-w-[100px] w-full">
      {/* Label */}
      <span className="text-white text-xs mb-1.5">{title}</span>

      <Popover open={open && isEdit} onOpenChange={(val) => isEdit && setOpen(val)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={!isEdit}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm text-white",
              "bg-black border border-white",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-white",
              !isEdit && "opacity-60 cursor-not-allowed"
            )}
          >
            <span className="truncate text-left">{displayText}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-70" />
          </button>
        </PopoverTrigger>

        {/* z-[1300] ensures the portal renders above the SideDrawer (z-[1201]) */}
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[180px] z-[1300]"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Search..." className="h-9" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const key      = getKey(option);
                  const label    = getLabel(option);
                  const color    = isColor ? getColor(option) : undefined;
                  const isChecked = selected.includes(key);

                  return (
                    <CommandItem
                      key={key}
                      value={label}
                      onSelect={() => toggle(key)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                          isChecked ? "bg-primary text-primary-foreground" : "opacity-50"
                        )}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>

                      {isColor && color ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block w-4 h-2 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                          <span>{label}</span>
                        </div>
                      ) : (
                        <span>{label}</span>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SymMultiSelectDropdown;