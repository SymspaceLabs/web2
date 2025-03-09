"use client"

import "@/i18n";
import RTL from "@/components/rtl";
import ThemeProvider from "@/theme/theme-provider"; // PRODUCT CART PROVIDER
import CartProvider from "@/contexts/CartContext"; // SITE SETTINGS PROVIDER
import SettingsProvider from "@/contexts/SettingContext"; // GLOBAL CUSTOM COMPONENTS
import ProgressBar from "@/components/progress"; // IMPORT i18n SUPPORT FILE
import SnackbarProvider from "@/contexts/SnackbarContext";
import { AuthProvider } from "@/contexts/AuthContext"
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" async></script>
        <script src="https://accounts.google.com/gsi/client" async defer ></script>
        <style>
          {`
            .css-1ix0aqo-MuiSnackbar-root {
              z-index: 2000 !important;
            }
          `}
        </style>

      </head>
      <body>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <AuthProvider>
              <ThemeProvider>
                <SnackbarProvider>
                  <CartProvider>
                    <SettingsProvider>
                          <ProgressBar />
                          <RTL>{children}</RTL>
                    </SettingsProvider>
                  </CartProvider>
                </SnackbarProvider>
              </ThemeProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
      </body>
    </html>
  );
}