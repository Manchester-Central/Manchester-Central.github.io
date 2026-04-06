"use client";

import { Inter } from "next/font/google";
import "./assets/css/globals.css";

const inter = Inter({ subsets: ["latin"] });

import { Sidebar, SidebarLogo, SidebarItems, SidebarItemGroup, SidebarCollapse, SidebarItem } from "flowbite-react";
import { HiFolder, HiDocumentText } from "react-icons/hi";
import { getLibraryPath } from "./library/documentation";
import { AllDocuments } from "./library/all-documents";
import { usePathname } from 'next/navigation'

import "highlight.js/styles/github.css";
import { MathJaxContext } from "better-react-mathjax";

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
            <Sidebar aria-label="Sidebar with logo branding example" style={{ minHeight: "100vh" }} className="w-80">
              <SidebarLogo href="/" img="/logo.png" className="sidebar-logo-custom" imgAlt="CHAOS logo" />
              <SidebarItems>
                <SidebarItemGroup>
                  {AllDocuments.map(metadata => <SidebarCollapse label={metadata.title} icon={HiFolder} key={metadata.path} open={pathname === getLibraryPath(metadata)}>
                    <SidebarItem href={`${getLibraryPath(metadata)}#Introduction`} icon={HiDocumentText} key={`${metadata.path}-introduction`}>
                      Introduction
                    </SidebarItem>
                    {metadata.sections.map(section => <SidebarItem href={getLibraryPath(metadata, section)} icon={HiDocumentText} key={`${metadata.path}-${section.title}`}>
                      {section.title}
                    </SidebarItem>)}
                  </SidebarCollapse>)}
                </SidebarItemGroup>
              </SidebarItems>
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
