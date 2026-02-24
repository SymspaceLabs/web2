// =========================================================
// Title for Forms
// =========================================================

interface LogoWithTitleProps {
  title: string;
  subTitle?: string;
}

const LogoWithTitle = ({ title, subTitle }: LogoWithTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1 sm:py-4 max-w-[450px] sm:max-w-full w-full mx-auto text-center">
      <h1 className="font-elemental text-white text-[16px] sm:text-[24px] tracking-[0.05em] leading-snug">
        {title}
      </h1>
      {subTitle && (
        <p className="font-helvetica text-white text-[10px] sm:text-[14px]">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default LogoWithTitle;