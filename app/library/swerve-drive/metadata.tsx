import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { SwerveDriveIntroduction } from "./introduction";
import { TranslationalMovement } from "./translational-movement";
import { RotationalMovement } from "./rotational-movement";
import { CombinedMovement } from "./combined-movement";
import { InPractice } from "./in-practice";
import { Motors } from "./motors";

const sections: DocumentationSection[] = [
  {
    title: "Translational Movement",
    html: <TranslationalMovement/>
  },
  {
    title: "Rotational Movement",
    html: <RotationalMovement/>
  },
  {
    title: "Combined Movement",
    html: <CombinedMovement/>
  },
  {
    title: "In Practice",
    html: <InPractice/>
  },
  {
    title: "Motors",
    html: <Motors/>
  },
]

export const SwerveDriveMetadata: DocumentationMetadata = {
  path: "swerve-drive",
  title: "Swerve Drive",
  description: "This explains our implementation of Swerve Drive",
  lastUpdated: "July 2024",
  introduction: <SwerveDriveIntroduction/>,
  sections: sections,
}