import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "../components/convex-client-provider";
import { Inter } from "next/font/google";
import {ConvexAuthNextjsServerProvider} from "@convex-dev/auth/nextjs/server";
import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { JotaiProvider } from "@/components/jotai-provider";

const inter = Inter({ subsets: ["latin"] });  

export const metadata: Metadata = {
  title: "TeamSync",
  description: "TeamSync is a team collaboration tool that helps you and your team stay organized and productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          <ConvexClientProvider>
            <JotaiProvider>
              <Toaster/>
              <Modals/>
              {children}
            </JotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
