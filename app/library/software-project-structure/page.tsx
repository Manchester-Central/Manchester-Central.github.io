import Documentation from "@/app/library/documentation";
import { SoftwareProjectStructureMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${SoftwareProjectStructureMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={SoftwareProjectStructureMetadata} />
  );
}