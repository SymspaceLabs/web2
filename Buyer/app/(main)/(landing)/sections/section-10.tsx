'use client'

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SymGLTFViewer from '@/components/sym-gltf-viewer';

// Define animation variants
const listItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
  }),
};

const rightComponentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }
  },
};

export default function Section10() {
  const features = [
    "Innovative and immersive experiences",
    "Improve consumer confidence and convenience",
    "Reduce manufacturing and inventory costs",
    "Customizable AR content for marketing purposes",
    "Awareness and assistance for underserved communities",
    "Gauge consumer demand through AR Room",
  ];

  // Refs for tracking visibility
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // useInView hooks
  const leftInView = useInView(leftRef, { once: true, amount: 0.2 });
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  // Persistent state for animation
  const [leftHasAnimated, setLeftHasAnimated] = useState(false);
  const [rightHasAnimated, setRightHasAnimated] = useState(false);

  // Set state once animation is triggered
  useEffect(() => {
    if (leftInView) setLeftHasAnimated(true);
    if (rightInView) setRightHasAnimated(true);
  }, [leftInView, rightInView]);

  return (
    <section className="relative z-[2]">
      <div className="container mx-auto px-4">
        <div className="flex-grow py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left section: List of features */}
            <div className="flex flex-col gap-4">
              <motion.div
                ref={leftRef}
                initial="hidden"
                animate={leftHasAnimated ? "visible" : "hidden"}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={listItemVariants}
                    custom={index}
                    className="mb-4"
                  >
                    <div 
                      className={`p-4 sm:p-10 rounded-[20px] sm:rounded-[25px] text-center sm:text-left ${
                        index % 2 === 0 ? 'bg-[#D5D5D5]' : 'bg-white'
                      }`}
                    >
                      <p className="font-helvetica text-black text-xs sm:text-xl font-bold">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right section: 3D interactive canvas */}
            <div>
              <motion.div
                ref={rightRef}
                initial="hidden"
                animate={rightHasAnimated ? "visible" : "hidden"}
                variants={rightComponentVariants}
              >
                <SymGLTFViewer
                  modelUrl="https://simspace-aws-s3.s3.us-east-2.amazonaws.com/xander-vera-cherub-blue-angel-mini-bag.glb"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}