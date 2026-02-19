// app/_lib/constants/styles.ts
export const BUTTON_VARIANTS = {
  gradient: `
    flex items-center gap-3 bg-gradient-to-br from-[#18C8FF] to-[#933FFE] 
    text-white rounded-[50px] px-6 py-3 min-w-[180px]
    transition-all duration-300 hover:shadow-md hover:border-white/50
  `,
  outlined: `
    flex-1 sm:flex-none min-w-full sm:min-w-[250px] text-white rounded-[50px]
    border-2 border-white py-2 sm:py-4 px-6 text-[10px] sm:text-base
    transition-all duration-300 ease-in-out font-bold uppercase
    hover:bg-gradient-to-r hover:from-white hover:to-[#AEAEAE] hover:text-black
  `
} as const;

export const TYPOGRAPHY_VARIANTS = {
  sectionHeader: "text-lg sm:text-[55px] text-white",
  sectionParagraph: "text-white text-xs sm:text-lg text-justify container leading-[1.5] sm:leading-[2]"
} as const;

export const LAYOUT_VARIANTS = {
  container: "container mx-auto px-4",
  containerWide: "container mx-auto px-4"
} as const;