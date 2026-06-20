import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAWYGO — 송무관리 프로그램",
  description:
    "진행 중인 모든 사건의 기일·불변기한·결재·자료를 놓치지 않고 추적합니다. 이제 LawyGo에게 맡겨보세요.",
  applicationName: "LawyGo",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LawyGo",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/brand/lawygo-icon.png", type: "image/png" }],
    apple: [{ url: "/brand/lawygo-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "LAWYGO — 송무관리 프로그램",
    description: "사건 수임은 끝이 아닌 시작입니다.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b322c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={playfair.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
