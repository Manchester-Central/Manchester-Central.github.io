import Documentation from "@/app/library/documentation";
import { LocalizationMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${LocalizationMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={LocalizationMetadata} />
  );
}