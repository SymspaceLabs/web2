import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SymDropdownProps {
  title: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  options: string[];
  isEdit?: boolean;
  hasOthersOption?: boolean;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const SymDropdown: React.FC<SymDropdownProps> = ({
  title,
  value,
  onChange,
  options,
  isEdit = true,
  hasOthersOption = false,
  placeholder = 'Select an option',
  error = false,
  helperText = '',
}) => {
  const isOtherSelected = value?.startsWith('Other:');

  // ── FIX: must be undefined (not "") for Radix to show placeholder ──
  const selectValue = isOtherSelected
    ? 'Other (please specify)'
    : value !== ''
    ? value
    : undefined;

  const handleSelectChange = (selected: string) => {
    if (selected === 'Other (please specify)') {
      onChange({ target: { value: 'Other:' } });
    } else {
      onChange({ target: { value: selected } });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[100px]">
      <div className="flex items-center gap-2 mb-2">
        <Label className="text-[12px] font-elemental lowercase text-white">
          {title}
        </Label>
      </div>

      <Select
        value={selectValue}
        onValueChange={handleSelectChange}
        disabled={!isEdit}
      >
        <SelectTrigger
          className={[
            "w-full h-auto data-[size=default]:h-auto py-3 px-3",
            "bg-black border border-gray-700 rounded-md",
            "font-helvetica text-sm",
            "[&_svg]:text-white [&_svg]:opacity-100 [&_svg]:shrink-0",
            "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            !value ? "text-gray-400" : "text-white",
            error ? "border-red-500" : "",
          ].join(" ")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-black text-white border-gray-700">
          {options.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="text-white hover:bg-gray-800 focus:bg-gray-800 font-helvetica"
            >
              {item}
            </SelectItem>
          ))}
          {hasOthersOption && (
            <SelectItem
              value="Other (please specify)"
              className="text-white hover:bg-gray-800 focus:bg-gray-800 font-helvetica"
            >
              Other (please specify)
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {error && helperText && (
        <p className="text-sm text-red-500 mt-1 ml-1">{helperText}</p>
      )}

      {hasOthersOption && isOtherSelected && (
        <Input
          placeholder="Please specify..."
          value={value.replace('Other:', '')}
          onChange={(e) =>
            onChange({ target: { value: `Other:${e.target.value}` } })
          }
          className="mt-2 py-3 bg-black text-white border-gray-700 rounded-md placeholder:text-gray-400 font-helvetica"
        />
      )}
    </div>
  );
};

export default SymDropdown;