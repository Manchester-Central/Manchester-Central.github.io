import Documentation from "@/app/library/documentation";
import { Math3Metadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${Math3Metadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={Math3Metadata} />
  );
}