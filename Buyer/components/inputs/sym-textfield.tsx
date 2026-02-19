import React from 'react';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SymTextFieldProps {
  title: string;
  toolTipText?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  isEdit?: boolean;
  placeholder?: string;
  charLimit?: number | false;
  showCharlimit?: boolean;
  type?: string;
  color?: string;
  theme?: 'light' | 'dark';
  mandatory?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const SymTextField: React.FC<SymTextFieldProps> = ({
  title,
  toolTipText,
  value,
  onChange,
  multiline = false,
  rows = 4,
  isEdit = true,
  placeholder = '',
  charLimit = false,
  showCharlimit = false,
  type = 'text',
  color = 'white',
  theme = 'dark',
  mandatory = false,
  error = false,
  helperText = '',
  className = '',
}) => {
  const currentLength = value?.length || 0;
  const isLight = theme === 'light';

  const inputClasses = `py-3 font-helvetica
    ${isLight ? 'bg-transparent text-black border-gray-300' : 'bg-black text-white border-gray-700'}
    ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
    rounded-md
    placeholder:${isLight ? 'text-gray-600' : 'text-gray-400'}
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
    [&[type=number]]:[-moz-appearance:textfield]
  `;

  return (
    <div className={`flex flex-col flex-1 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Label
          className={`text-[12px] font-elemental lowercase ${isLight ? 'text-black' : `text-${color}`}`}
        >
          {title}
        </Label>
        {mandatory && <span className="text-red-500 text-sm font-medium">*</span>}
        {toolTipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info
                  className={`w-3 h-3 cursor-help ${isLight ? 'text-black' : 'text-white'}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{toolTipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {multiline ? (
        <Textarea
          value={value}
          onChange={onChange}
          disabled={!isEdit}
          placeholder={placeholder}
          rows={rows}
          maxLength={charLimit || undefined}
          className={inputClasses}
        />
      ) : (
        <Input
          value={value}
          onChange={onChange}
          disabled={!isEdit}
          placeholder={placeholder}
          type={type}
          maxLength={charLimit || undefined}
          className={inputClasses}
        />
      )}

      {error && helperText && (
        <p className="text-sm text-red-500 mt-1">{helperText}</p>
      )}

      {charLimit && showCharlimit && (
        <p className={`text-xs mt-1 text-right ${isLight ? 'text-black' : 'text-white'}`}>
          {currentLength}/{charLimit}
        </p>
      )}
    </div>
  );
};

export default SymTextField;