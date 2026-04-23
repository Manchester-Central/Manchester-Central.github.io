import Documentation from "@/app/library/documentation";
import { PitPackingMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${PitPackingMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={PitPackingMetadata} />
  );
}