import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/app-layout/header";
import Footer from "@/components/app-layout/footer";
import "./globals.css";
import Chatbot from "@/components/chatbot/chatbot";
import ClientWrapper from "@/components/shared/clientWrapper";
import SettingService from "@/services/controlers/setting/setting.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  try {
    const logoResponse = await SettingService.getSetting (`logo-${process.env.NEXT_PUBLIC_VILLAGE_ID}`)
    return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Desa Muara Enim",
      icons: {
        icon: [
          new URL(logoResponse?.data?.value?.imageUrl)
        ]
      },
    }
  } catch {
     return {
      title: process.env.NEXT_PUBLIC_VILLAGE_NAME || "Desa Muara Enim",
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientWrapper>
          <div className="min-h-screen min-w-full bg-primary flex flex-col justify-between items-start w-full">
                <Header/>
                  <div className="flex w-full border-gray-200 justify-center items-center pb-8 mx-auto md:px-12 lg:px-14 p-3">
                    <main className="flex w-full flex-col gap-[56px] row-start-2 items-center sm:items-start">
                      {children}
                    </main>
                  </div>
                <Footer/>
            </div>
            <Chatbot/>
        </ClientWrapper>
      </body>
    </html>
  );
}
