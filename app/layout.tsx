'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context/ContextProvider";
import { Layout } from "antd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


const {Content, Header, Footer} = Layout
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
        <Layout className="min:h-full flex h-[100vh]">
          <Header className=" bg-blue-700 flex justify-center items-center min-h-24 mb-9">

            <h1 className="mt-2 text-4xl font-semibold text-gray-50">
              ToDo
            </h1>
            </Header>
          <Content className="h-[83vh] ">
            <ContextProvider>
            <div className="md:flex md:justify-center">
              {children}
            </div>
            </ContextProvider>
          </Content>
        
        </Layout>
      </body>
    </html>
  );
}
