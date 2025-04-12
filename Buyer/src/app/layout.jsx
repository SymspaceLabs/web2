"use client";

// ================================================================
//  Layout File
// ================================================================

import localFont from "next/font/local";
import ThemeProvider from "@/theme/theme-provider"; // Your custom ThemeProvider

// Load Custom Font (.ttf)
export const elementalEnd = localFont({
  src: "../../public/fonts/elemental-end.ttf",
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-elemental-end' // Optional CSS variable
});

import "@/i18n";
import RTL from "@/components/rtl";
import CartProvider from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import SettingsProvider from "@/contexts/SettingContext";
import ProgressBar from "@/components/progress";
import SnackbarProvider from "@/contexts/SnackbarContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" async></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <style suppressHydrationWarning>
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
              <SnackbarProvider>
                <FavoritesProvider>
                  <CartProvider>
                    <SettingsProvider>
                      <ThemeProvider> {/* Your custom ThemeProvider */}
                        <ProgressBar />
                        <RTL>{children}</RTL>
                      </ThemeProvider>
                    </SettingsProvider>
                  </CartProvider>
                </FavoritesProvider>
              </SnackbarProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
