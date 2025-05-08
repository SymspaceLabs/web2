"use client";

// ===============================================
// Section 1 | Contact Us
// ===============================================

import { ContactUsForm } from "@/components/forms";
import { LazyImage } from "@/components/lazy-image";
import { useState, useEffect, useMemo } from "react";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { SocialLinks } from "@/components/footer/components";
import { Box, Grid, Button, Container } from "@mui/material";
import { H1, Paragraph, Span } from '@/components/Typography';

import BoxLink from '@/pages-sections/sessions/components/box-link';

// ===============================================

export default function Section1({
  isSubmitted,
  setIsSubmitted
}) {
  const { showSnackbar } = useSnackbar();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValid(
        firstName && 
        lastName && 
        email && 
        topic && 
        message
    );
  }, [firstName, lastName, email, topic, message]);

  const buttonStyles = useMemo(() => ({
    background: isValid
        ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
        : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)",
      boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(50px)",
      borderRadius: "12px",
      color: '#fff',
      cursor: isValid ? 'pointer' : 'not-allowed',
      pointerEvents: isValid ? 'auto' : 'none',
      '&:hover': {
          background: isValid
              ? "linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)"
              : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)",
      },
  }), [isValid]);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setTopic('');
    setMessage('');
  }

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          topic,
          message
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
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
        <Box sx={cardStyle}>
          
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
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                topic={topic}
                setTopic={setTopic}
                message={message}
                setMessage={setMessage}
              />
              <Button 
                sx={buttonStyles} 
                fullWidth 
                type="submit" 
                color="primary" 
                variant="contained" 
                size="large"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>

              <Span display={{ color:'#fff', sm: "inline-block" }}>
                  By clicking Submit, you agree to our <BoxLink title="Terms" href="/terms-and-conditions#terms" />, <BoxLink title="Privacy Policy" href="/terms-and-conditions#privacy" /> and <BoxLink title="Cookies" href="/terms-and-conditions#cookies" />. You may receive SMS Notifications from us and can opt out any time.
              </Span> 
            </Grid>
          </Grid>
        </Box>  
        :
        <Box sx={[cardStyle, {width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:{xs:5, sm:25}, px:3, gap:2 }]}>
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

const cardStyle = {
  background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)',
  borderRadius: '50px',
  width:'100%'
};
