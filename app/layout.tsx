"use client";

import { Inter } from "next/font/google";
import "./assets/css/globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Sidebar } from "flowbite-react";
import { HiFolder, HiDocumentText } from "react-icons/hi";
import { getLibraryPath } from "./library/documentation";
import { AllDocuments } from "./library/all-documents";
import { usePathname } from 'next/navigation'
import type { CustomFlowbiteTheme } from "flowbite-react";

import "highlight.js/styles/github.css";
import { MathJaxContext } from "better-react-mathjax";

const sidebarTheme: CustomFlowbiteTheme = {
  sidebar: {
    root: {inner: "h-full overflow-y-auto overflow-x-hidden rounded bg-chaos-light-green px-3 py-4 dark:bg-gray-800"},
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <div style={{ display: "flex" }}>
          <div className="sidebar">
            <Sidebar aria-label="Sidebar with logo branding example" style={{ minHeight: "100vh" }} className="w-80" theme={sidebarTheme.sidebar}>
              <Sidebar.Logo href="/" img="/logo.png" imgAlt="CHAOS logo" >
                Library
              </Sidebar.Logo>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  {AllDocuments.map(metadata => <Sidebar.Collapse label={metadata.title} icon={HiFolder} key={metadata.path} open={pathname === getLibraryPath(metadata)}>
                    <Sidebar.Item href={`${getLibraryPath(metadata)}#Introduction`} icon={HiDocumentText} key={`${metadata.path}-introduction`}>
                      Introduction
                    </Sidebar.Item>
                    {metadata.sections.map(section => <Sidebar.Item href={getLibraryPath(metadata, section)} icon={HiDocumentText} key={`${metadata.path}-${section.title}`}>
                      {section.title}
                    </Sidebar.Item>)}
                  </Sidebar.Collapse>)}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>

          </div>
          <div style={{ flex: "1 1 0", maxHeight: "100vh", overflowY: "auto" }}>
            <div style={{ padding: 50 }}>
              <MathJaxContext>
                {children}
              </MathJaxContext>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
