import { Poppins, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import AppHeader from "@/components/AppHeader";
import { ModeToggle } from "@/components/ModeToggle";
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
    // url: "https://eghamatban.ir",
    siteName: "THE VOID",
    type: "website",
    /*     images: [
      {
        url: "https://eghamatban.ir/opengraph-image.png",
        width: 800,
        height: 400,
        alt: "اقامت بان - مدیریت هوشمند اقامتگاه‌ها",
      },
    ], */
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${orbitron.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider>
            <VoidBackground />
            {children}
            {/*    <LoreFragment/> */}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
