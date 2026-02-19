import React from 'react';
import { ChevronDown } from 'lucide-react';
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

  const handleSelectChange = (selected: string) => {
    if (selected === 'Other (please specify)') {
      onChange({ target: { value: 'Other:' } });
    } else {
      onChange({ target: { value: selected } });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[100px]">
      <Label className="text-[12px] font-elemental text-white mb-2">
        {title}
      </Label>

      <Select
        value={isOtherSelected ? 'Other (please specify)' : (value || undefined)}
        onValueChange={handleSelectChange}
        disabled={!isEdit}
      >
        <SelectTrigger
          className={`
            bg-black text-white border-gray-700 rounded-md h-[37px]
            ${!value ? 'text-white/50' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            [&_svg]:text-white
          `}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="bg-black text-white border-gray-700">
          {options.map((item) => (
            <SelectItem 
              key={item} 
              value={item}
              className="text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              {item}
            </SelectItem>
          ))}

          {hasOthersOption && (
            <SelectItem 
              value="Other (please specify)"
              className="text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              Other (please specify)
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {error && helperText && (
        <p className="text-sm text-red-500 mt-2 ml-1">
          {helperText}
        </p>
      )}

      {hasOthersOption && isOtherSelected && (
        <Input
          placeholder="Please specify..."
          value={value.replace('Other:', '')}
          onChange={(e) =>
            onChange({ target: { value: `Other:${e.target.value}` } })
          }
          className="mt-4 bg-black text-white border-gray-700 rounded-md placeholder:text-white/50"
        />
      )}
    </div>
  );
};

export default SymDropdown;