"use client";

// =======================================================
// Section 4 Component - Tailwind Version
// =======================================================

import { motion } from "framer-motion";
import SymGLTFViewer from "@/components/sym-gltf-viewer";
import SymSection from "@/components/sym-section";

// Animation variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function Section4() {
  return (
    <div id="benefits" className="z-[2]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col">
            <h1 className="font-elemental text-[20px] sm:text-[34px] text-center">
              revolutionize Shopping
            </h1>
            <h1 className="font-elemental text-[20px] sm:text-[34px] text-center">
              3d products & ar trial room
            </h1>
          </div>
        </motion.div>

        {/* Section 1 */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SymSection
            title="Generate 3d products with visible details"
            subTitle="Migrate your Entire Catalogue into a Centralized 3D Repository to market and gauge product demand prior to manufacturing"
            btnText="Get Started"
            btnUrl="/register"
            invert={false}
          >
            <SymGLTFViewer modelUrl="https://simspace-aws-s3.s3.us-east-2.amazonaws.com/xander-vera-cherub-blue-angel-mini-bag.glb" />
          </SymSection>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SymSection
            title="3d product ad Videos"
            subTitle="Showcase unique product features through a wide array of video templates to choose from"
            btnText="Contact us"
            btnUrl="/contact-us"
            invert={true}
          >
            <div className="flex justify-center w-full">
              <video
                width="50%"
                height="auto"
                autoPlay
                loop
                muted
                playsInline
                src="/videos/sell-on-symspace/black-t-shirt.mp4"
                poster="/videos/sell-on-symspace/black-t-shirt.mp4"
                className="relative z-[2] rounded-[50px]"
              />
            </div>
          </SymSection>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SymSection
            title="augmented reality Integration"
            subTitle="Empower customers through an AR Trial Room experience for customers to confidently trial products, receive sizing recommendations, and checkout seamlessly"
            btnText="Learn More"
            btnUrl="/ar-app-simulation"
            invert={false}
          >
            <div className="flex justify-center w-full">
              <video
                width="40%"
                height="auto"
                autoPlay
                loop
                muted
                playsInline
                src="/videos/sell-on-symspace/model.mp4"
                poster="/videos/sell-on-symspace/model.mp4"
                className="relative z-[2] rounded-[50px]"
              />
            </div>
          </SymSection>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SymSection
            title="Increase conversion & reduce returns"
            subTitle="By improving the customer experience through an immersive and interactive experience, shoppers view  products conveniently and confidently resulting to an  increase in sales and decrease in returns"
            btnText="Learn More"
            btnUrl="/"
            invert={true}
          >
            <div className="flex justify-center w-full">
              <video
                width="50%"
                height="auto"
                autoPlay
                loop
                muted
                playsInline
                src="/videos/sell-on-symspace/black-t-shirt.mp4"
                poster="/videos/sell-on-symspace/black-t-shirt.mp4"
                className="relative z-[2] rounded-[50px]"
              />
            </div>
          </SymSection>
        </motion.div>
      </div>
    </div>
  );
}