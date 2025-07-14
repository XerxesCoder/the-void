import { Poppins, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { SoundProvider } from "@/Providers/SoundEffectProvider";
import VoidBackground from "@/components/Background/VoidBackground";
import LoreFragment from "@/components/LoreFragments";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "THE VOID",
  description: "You are not alone in the VOID. The ENTITY is already aware.",
  openGraph: {
    title: "THE VOID",
    description: "You are not alone in the VOID. The ENTITY is already aware.",

    siteName: "THE VOID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${orbitron.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <VoidBackground />
            {children}
            <LoreFragment />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
