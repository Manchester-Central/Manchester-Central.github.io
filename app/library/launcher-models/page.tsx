import Documentation from "@/app/library/documentation";
import { LauncherMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${LauncherMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={LauncherMetadata} />
  );
}