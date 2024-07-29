import Documentation from "@/app/library/documentation";
import { Math2Metadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${Math2Metadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={Math2Metadata} />
  );
}