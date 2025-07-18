"use client";

// ===============================================
// Section 1 | Contact Us
// ===============================================

import { useState } from "react";
import { LazyImage } from "@/components/lazy-image";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { ContactUsForm } from "@/components/custom-forms";
import { SymButton } from "@/components/custom-components"; // Make sure SymButton exists and accepts 'loading' prop
import { SocialLinks } from "@/components/footer/components";
import { Box, Grid, Button, Container } from "@mui/material"; // Keep Button if needed elsewhere or remove if not.
import { H1, Paragraph, Span } from '@/components/Typography';

import BoxLink from '@/pages-sections/sessions/components/box-link';

// ===============================================

export default function Section1({
  isSubmitted,
  setIsSubmitted
}) {
  const { showSnackbar } = useSnackbar();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // NEW: State to track submission attempt

  const clearForm = () => {
    setFullName('');
    setEmail('');
    setTopic('');
    setMessage('');
    setFormSubmitted(false); // NEW: Reset formSubmitted state when clearing the form
  }

  const handleSubmit = async () => {
    setFormSubmitted(true); // NEW: Indicate that a submission attempt has occurred

    // NEW: Perform immediate validation check
    const allFieldsFilled = fullName && email && topic && message;

    if (!allFieldsFilled) {
        showSnackbar("Please fill in all required fields.", "error");
        return; // Prevent API call if form is not valid
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
        showSnackbar("We've received your message!", "success");
      } else {
        showSnackbar(data.message, "error");
      }

      
    } catch (error) {
      showSnackbar('Network error. Please try again.', "error");
    }

    setLoading(false);
  };

  return (
    <Container sx={{ py: 10 }}>
      {
        !isSubmitted?
        <Box sx={styles.card}>

          {/* Grid Layout */}
          <Grid container p={5} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6} sx={{ textAlign: 'center', mb: { xs: 5, md: 0 } }}>
              <H1 fontSize={{ sm: 40, xs: 30 }} lineHeight={1.2} color="#fff">
                get in touch
              </H1>

              <Paragraph fontWeight={300} color="#fff" lineHeight={1.2} fontSize={{ xs: 14, sm: 16 }}>
                We’re here to help. Why wait? Reach out today.
              </Paragraph>

            </Grid>

            {/* Right Content */}
            <Grid item xs={12} md={6} sx={{display:'flex', flexDirection:'column', gap:3 }}>
              <ContactUsForm
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                topic={topic}
                setTopic={setTopic}
                message={message}
                setMessage={setMessage}
                formSubmitted={formSubmitted} // NEW: Pass the formSubmitted state
              />
              {/* Submit Button */}
              <SymButton
                sx={styles.btn}
                onClick={handleSubmit}
                loading={loading}
              >
                Submit
              </SymButton>

              <Span display={{ color:'#fff', sm: "inline-block" }}>
                  By clicking Submit, you agree to our <BoxLink title="Terms" href="/terms-and-conditions#terms" />, <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy" /> and <BoxLink title="Cookies" href="/terms-and-conditions#cookies" />. You may receive SMS Notifications from us and can opt out any time.
              </Span>
            </Grid>
          </Grid>
        </Box>
        :
        <Box sx={[styles.card, {width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:{xs:5, sm:25}, px:3, gap:2 }]}>
          <Box>
            <LazyImage
              src='/assets/images/contact-us/check-mark.png'
              width={100}
              height={100}
              alt="User"
            />
          </Box>
          <H1 fontSize={{ sm: 40, xs: 30 }} lineHeight={1.2} color="#fff" textAlign="center">
            thank you for reaching out!
          </H1>
          <Paragraph fontWeight={300} color="#fff" lineHeight={1.2} fontSize={{ xs: 14, sm: 16 }}>
            We’re here to help. Why wait? Reach out today.
          </Paragraph>
          <Paragraph fontWeight={300} color="#fff" lineHeight={1.2} fontSize={{ xs: 14, sm: 16 }}>
            In the mean time, check out our resources.
          </Paragraph>
          <Button sx={{ mt:5, background:'#fff', color:'#000', borderRadius:'50px', px:4, py:2, width: { xs: "100%", sm: "auto" } }}>
            Resources
          </Button>
          <Paragraph fontWeight={300} color="#fff" lineHeight={1.2} fontSize={{ xs: 14, sm: 16 }}>
            Follow us
          </Paragraph>
          <SocialLinks />
        </Box>
      }
    </Container>
  );
}

const styles = {
  card : {
    background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)',
    borderRadius: '50px',
    width:'100%'
  },
  btn : {
    width:'100%',
    py:1.5,
    fontWeight: 500,
    fontSize: {xs:14, sm:18},
    background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
    boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(50px)",
    borderRadius: "12px",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)",
    },
  }
}