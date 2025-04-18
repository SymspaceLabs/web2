"use client";

import "../i18n";
import { useEffect } from "react";
import RTL from "../components/rtl";
import localFont from "next/font/local";
import ProgressBar from "../components/progress";
import ThemeProvider from "../theme/theme-provider";
import { useRouter, usePathname } from "next/navigation";
import SettingsProvider from "../contexts/SettingContext";
import SnackbarProvider from "../contexts/SnackbarContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

// Load Custom Font (.ttf)
export const elementalEnd = localFont({
  src: "../../public/fonts/elemental-end.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-elemental-end",
});

// ProtectedLayout ensures auth is checked inside AuthProvider
const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // List of routes that don't require authentication
  const publicRoutes = [
    "/forgot-password",
    "/otp",
    "/otp-forgot-password",
    "/register",
    "/reset-password",
    "/sign-in",
    "/verification-success",
    "/verify-email",
  ];

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, loading, pathname, router]);

  return children;
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <script
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          async
        ></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <SnackbarProvider>
                <SettingsProvider>
                  <ProgressBar />
                  <ProtectedLayout>
                    <RTL>{children}</RTL>
                  </ProtectedLayout>
                </SettingsProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
