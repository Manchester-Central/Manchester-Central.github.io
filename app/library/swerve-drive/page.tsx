import Documentation from "@/app/library/documentation";
import { SwerveDriveMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${SwerveDriveMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={SwerveDriveMetadata} />
  );
}