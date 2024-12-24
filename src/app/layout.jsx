import localFont from "next/font/local";
import "./globals.css";
import Providers from "./storeProvider";
// import { Provider } from "react-redux";
// import store from "@/Store/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EndWell",
  description: "EndWell",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
     <Providers>
      {children}
     </Providers>
      </body>
    </html>
  );
}
