// ==============================================================
// Section 1 || Careers Page
// ==============================================================

export default function Section1() {

  return (
    <div className="w-full flex flex-col items-center py-9 pt-[100px] md:pt-[200px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col w-full max-w-[1000px]">
          <h1 className="font-elemental text-[25px] sm:text-[45px] text-white leading-tight">
            Let's build the future together
          </h1>
          <div className="flex justify-center sm:justify-end mt-0 sm:-mt-6">
            <div className="w-[250px] sm:w-[500px]">
              <img
                alt="furniture shop"
                width={500}
                height={500}
                src="/images/careers/hero-image.png"
                className="w-full h-auto"
              />
            </div>
          </div>
      </div>
    </div>
  );
}