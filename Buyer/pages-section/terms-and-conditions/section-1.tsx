"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Types ───────────────────────────────────────────────────
interface Term {
  id?: string;
  question: string;
  answer: string;
}

// ─── Data ────────────────────────────────────────────────────
const TERMS: Term[] = [
  {
    id: "terms",
    question: "Terms of Use",
    answer: `<h3>Last Updated: March 21, 2025</h3><br/><h3>1. Introduction and Acceptance of Terms</h3><p>Welcome to Symspace, an AI-driven 3D modeling and augmented reality (AR) marketplace platform. These Terms of Use ('Terms') govern your access to and use of the Symspace websites, mobile applications, Unity SDK components, and related services (collectively, the 'Symspace Platform' or 'Services'). By accessing or using the Symspace Platform, you agree to be bound by these Terms, as well as our Privacy Policy, Buyer Agreement, and Seller Agreement (if applicable). If you do not agree, you must not use the Symspace Platform.</p><br/><h3>2. Definitions</h3><p>For purposes of these Terms:</p><ul><li><strong>'Symspace'</strong> (also 'we,' 'us,' or 'our') refers to Symspace Labs, Inc. and its affiliates, subsidiaries, and partner organizations.</li><li><strong>'Symspace Platform'</strong> refers to any Symspace websites ('Sites'), mobile apps ('Apps'), Unity SDK or AR components, AI tools, chatbots, and related services we provide.</li><li><strong>'User'</strong> (also 'you' or 'your') refers to any person or entity accessing or using the Symspace Platform, including buyers, sellers, and other visitors.</li><li><strong>'Content'</strong> includes all information, text, graphics, 3D models, images, video, audio, software, code, and other material on the Symspace Platform.</li></ul>`,
  },
  {
    id: "privacy",
    question: "Privacy Policy",
    answer: `<p><strong>Last Updated:</strong> March 21, 2025</p><p>Symspace Labs, Inc. ("Symspace," "we," "us," or "our") values your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect about you when you use our AI-driven 3D modeling and AR marketplace platform (the "Symspace Platform" or "Services"), how we use and share that information, and your rights and choices regarding your information.</p><h2>1. Information We Collect</h2><p>We collect information from and about users in a few different ways: information you provide to us, information we collect automatically when you use our Services, and information from third parties.</p><h3>1.1 Information You Provide to Us</h3><p><strong>Account and Profile Information:</strong> When you register for a Symspace account or sign up as a buyer or seller, we may collect personal information such as your name, email address, username, password, phone number, and physical address.</p>`,
  },
  {
    question: "Buyer Terms & Conditions",
    answer: `<p><strong>Last Updated:</strong> March 21, 2025</p><p>Welcome to Symspace! This Buyer Agreement ("Agreement") sets forth the terms and conditions specifically applicable to buyers ("Buyer" or "you") who use the Symspace Platform to purchase products or services. By creating a Symspace account or making a purchase through Symspace's websites or apps, you agree to this Buyer Agreement, as well as the general Terms of Use and the Privacy Policy.</p><h2>1. Symspace Marketplace Role</h2><h3>1.1. Marketplace Platform</h3><p>Symspace provides an online marketplace and AR platform that enables third-party sellers ("Sellers") to list and sell their products, and buyers to discover and purchase those products. Symspace itself is generally not the seller of the items listed by third-party Sellers, unless an item is expressly indicated as being sold by Symspace.</p>`,
  },
  {
    question: "Seller Terms & Conditions",
    answer: `<p><strong>Last Updated:</strong> March 21, 2025</p><p>This Symspace Seller Agreement ("Agreement") is a legally binding contract between Symspace Labs, Inc. ("Symspace," "we," or "us") and you, the Seller ("Seller" or "you"), governing your participation as a third-party seller on the Symspace marketplace platform. By registering for a Symspace seller account or listing any products/services for sale on Symspace, you agree to this Seller Agreement, as well as the Symspace Terms of Use and Privacy Policy.</p><h2>1. Enrollment and Seller Account</h2><h3>1.1. Eligibility and Application:</h3><p>To sell on Symspace, you must create a seller account. You represent that you are a business entity or individual with the legal capacity to enter into this Agreement and fulfill your obligations. You must be 18 or older.</p>`,
  },
];

// ─── Component ───────────────────────────────────────────────
export default function Section1() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const match = TERMS.find((t) => t.id === hash);
        if (match) setOpenItem(hash);
      }
    }
  }, []);

  return (
    <section className="w-full pt-[100px] md:pt-[200px] py-8 sm:py-20 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full overflow-hidden"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col gap-6 py-4 sm:py-8">
            <h1 className="text-[20px] sm:text-[50px] font-bold text-white leading-tight">
              Legal &amp; policies
            </h1>

            <hr className="border-white/20" />

            <p className="text-[14px] sm:text-[24px] text-white/70">
              Last Updated: March 21, 2025
            </p>

            <p className="text-[14px] sm:text-[24px] text-white/80 max-w-4xl">
              Symspace values transparency and clarity. Below you will find
              detailed policies designed to protect and inform our users, buyers,
              sellers, and partners. Please carefully review each policy to
              understand your rights, responsibilities, and how we handle your
              data and transactions. If you have any questions regarding these
              policies, feel free to contact us directly.
            </p>
          </div>

          {/* Accordion */}
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="space-y-0"
          >
            {TERMS.map((term, index) => {
              const value = term.id ?? String(index);
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={value}
                    className="border border-white/10 rounded-lg mb-3 bg-white/5 backdrop-blur-sm overflow-hidden data-[state=open]:bg-white/10 transition-colors"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:no-underline text-left group">
                      <span className="text-[10px] sm:text-[18px] font-semibold text-white group-hover:text-white/80 transition-colors capitalize">
                        {term.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-6">
                      <div
                        className="text-white/80 text-sm sm:text-base prose prose-invert max-w-none
                          prose-headings:text-white prose-headings:font-semibold
                          prose-h2:text-lg prose-h3:text-base prose-h4:text-sm
                          prose-p:text-white/80 prose-li:text-white/80
                          prose-a:text-blue-400 prose-a:hover:text-blue-300
                          prose-strong:text-white
                          prose-ul:list-disc prose-ul:pl-5"
                        dangerouslySetInnerHTML={{ __html: term.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
}