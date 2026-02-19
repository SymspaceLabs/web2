import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
// import { SocialLinks } from "@/components/footer/components";
import ContactUsForm from "@/components/forms/contact-us";
import SymButton from "@/components/sym-button";
import BoxLink from "@/components/box-link";

interface Section1Props {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}

function Section1({ isSubmitted, setIsSubmitted }: Section1Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setTopic('');
    setMessage('');
    setFormSubmitted(false);
  }

  const handleSubmit = async () => {
    setFormSubmitted(true);

    const allFieldsFilled = fullName && email && topic && message;

    if (!allFieldsFilled) {
      toast.error("Please fill in all required fields."); // Changed this
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          topic,
          message
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        clearForm();
        toast.success("We've received your message!"); // Changed this
      } else {
        toast.error(data.message || "Something went wrong"); // Changed this
      }
    } catch (error) {
      toast.error("Network error. Please try again."); // Changed this
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 pt-[100px] md:pt-[175px]">
      {!isSubmitted ? (
        <div className="w-full rounded-[50px] bg-gradient-to-b from-[rgba(140,140,140,0.3)] to-[rgba(140,140,140,0.3)] backdrop-blur-sm" style={{
          background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)'
        }}>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 items-center">
            {/* Left Content */}
            <div className="text-center mb-5 md:mb-0">
              <h1 className="text-[30px] sm:text-[40px] leading-[1.2] text-white font-elemental">
                get in touch
              </h1>
              <p className="font-helvetica text-white leading-[1.2] text-sm sm:text-base">
                We're here to help. Why wait? Reach out today.
              </p>
            </div>

            {/* Right Content */}
            <div className="flex flex-col gap-3">
              <ContactUsForm
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                topic={topic}
                setTopic={setTopic}
                message={message}
                setMessage={setMessage}
                formSubmitted={formSubmitted}
              />
              
              {/* Submit Button */}
              <SymButton
                className="w-full py-1.5 font-medium text-sm sm:text-lg text-white rounded-xl transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
                  boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(50px)"
                }}
                onClick={handleSubmit}
                loading={loading}
              >
                Submit
              </SymButton>

              <span className="text-white text-sm inline-block font-helvetica">
                By clicking Submit, you agree to our{" "}
                <BoxLink title="Terms" href="/terms-and-conditions#terms" />,{" "}
                <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy" /> and{" "}
                <BoxLink title="Cookies" href="/terms-and-conditions#cookies" />. You may receive SMS Notifications from us and can opt out any time.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-[50px] flex flex-col items-center py-5 sm:py-25 px-3 gap-2" style={{
          background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <Image
              src='/assets/images/contact-us/check-mark.png'
              width={100}
              height={100}
              alt="Success"
            />
          </div>
          <h1 className="text-[30px] sm:text-[40px] leading-[1.2] text-white text-center font-bold">
            thank you for reaching out!
          </h1>
          <p className="font-light text-white leading-[1.2] text-sm sm:text-base">
            We're here to help. Why wait? Reach out today.
          </p>
          <p className="font-light text-white leading-[1.2] text-sm sm:text-base">
            In the mean time, check out our resources.
          </p>
          <button className="mt-5 bg-white text-black rounded-[50px] px-4 py-2 w-full sm:w-auto font-semibold text-base lowercase transition-all duration-300 shadow-lg hover:bg-gradient-to-br hover:from-[#3084FF] hover:to-[#1D4F99] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(48,132,255,0.4)]">
            Resources
          </button>
          <p className="font-light text-white leading-[1.2] text-sm sm:text-base">
            Follow us
          </p>
          {/* <SocialLinks /> */}
        </div>
      )}
    </div>
  );
}

export default Section1;