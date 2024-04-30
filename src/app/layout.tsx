import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/next-theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ModalProvider from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
const font = DM_Sans({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Plura",
  description: "All in one agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>


    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}

      >
      <ModalProvider>
      {children}
      <Toaster />
      </ModalProvider>
      </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
