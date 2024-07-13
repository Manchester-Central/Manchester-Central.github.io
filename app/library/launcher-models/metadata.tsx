import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { LauncherIntroduction } from "./introduction";

const sections: DocumentationSection[] = [
]

export const LauncherMetadata: DocumentationMetadata = {
  path: "launcher-models",
  title: "Launcher Models",
  description: "This explains how to estimate launcher trajectories",
  lastUpdated: "July 2024",
  introduction: <LauncherIntroduction/>,
  sections: sections,
}