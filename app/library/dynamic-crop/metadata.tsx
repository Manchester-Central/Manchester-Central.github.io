import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { DynamicCropIntroduction } from "./introduction";
import { Detour } from "./detour";
import { AprilTags } from "./april-tags";
import { WhereItGoesWrong } from "./where-it-goes-wrong";

const sections: DocumentationSection[] = [
  {
    title: "Detour: Other Disciplines",
    html: <Detour/>
  },
  {
    title: "April Tags",
    html: <AprilTags/>
  },
  {
    title: "... Where It All Goes Wrong",
    html: <WhereItGoesWrong/>
  },
]

export const DynamicCropMetadata: DocumentationMetadata = {
  path: "dynamic-crop",
  title: "Dynamic Crop W/ LimeLights",
  description: "This explains how to do selectively crop parts of the image feed to improve framerates.",
  lastUpdated: "July 2024",
  introduction: <DynamicCropIntroduction/>,
  sections: sections,
}