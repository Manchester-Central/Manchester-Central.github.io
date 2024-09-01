import Documentation from "@/app/library/documentation";
import { KinematicsMetadata } from "./metadata";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: `${KinematicsMetadata.title} - CHAOS Library`,
}

export default function Test() {
  return (
    <Documentation metadata={KinematicsMetadata} />
  );
}