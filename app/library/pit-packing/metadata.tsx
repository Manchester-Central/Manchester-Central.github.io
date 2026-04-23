import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { PitPackingIntroduction } from "./introduction";
import { Packing } from "./packing";
import { Layout } from "./pitlayout";
import { Networking } from "./wires-networks";

const sections: DocumentationSection[] = [
  {
    title: "Packing",
    html: <Packing/>
  },
  {
    title: "Pit Layout",
    html: <Layout/>
  },
  {
    title: "Wires and Networks",
    html: <Networking/>
  }
]

export const PitPackingMetadata: DocumentationMetadata = {
  path: "pit-packing",
  title: "Pit Packing",
  description: "Pit packing guidelines and best practices",
  lastUpdated: "April 2026",
  introduction: <PitPackingIntroduction/>,
  sections: sections,
}