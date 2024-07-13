import Documentation from "@/app/library/documentation";
import { Math1Metadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${Math1Metadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={Math1Metadata} />
  );
}