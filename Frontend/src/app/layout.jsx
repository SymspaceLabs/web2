"use client"

import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); // THEME PROVIDER

import ThemeProvider from "@/theme/theme-provider"; // PRODUCT CART PROVIDER
import CartProvider from "@/contexts/CartContext"; // SITE SETTINGS PROVIDER
import { AuthProvider } from "@/contexts/AuthContext"
import SettingsProvider from "@/contexts/SettingContext"; // GLOBAL CUSTOM COMPONENTS
import RTL from "@/components/rtl";
import ProgressBar from "@/components/progress"; // IMPORT i18n SUPPORT FILE
import "@/i18n";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SnackbarProvider from "@/contexts/SnackbarContext";

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" async></script>
        <script src="https://accounts.google.com/gsi/client" async defer ></script>
      </head>
      <body className={openSans.className}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <AuthProvider>
              <CartProvider>
                <SettingsProvider>
                  <ThemeProvider>
                    <SnackbarProvider>
                      <ProgressBar />
                      <RTL>{children}</RTL>
                    </SnackbarProvider>
                  </ThemeProvider>
                </SettingsProvider>
              </CartProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
      </body>
    </html>
  );
}