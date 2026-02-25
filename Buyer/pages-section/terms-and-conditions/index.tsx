import Section1 from "./section-1";
import Section2 from "./section-2";

export default function TermsPageView() {
  return (
    <div className="relative flex flex-col overflow-hidden bg-[#1F1F1F] min-h-screen w-full">
      {/* Gradient blob — top-right */}
      {/* <div
        className="pointer-events-none absolute top-[10%] right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
        }}
      /> */}

      {/* Content */}
      <div className="relative z-10 w-full">
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
}