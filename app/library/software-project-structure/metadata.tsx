import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { SoftwareProjectStructureIntroduction } from "./introduction";
import { SharedCode } from "./shared-code";
import { Commands } from "./commands";
import { StateMachines } from "./state-machines";
// import { RotationalMovement } from "./rotational-movement";
// import { CombinedMovement } from "./combined-movement";
// import { PID } from "./pid";

const sections: DocumentationSection[] = [
  {
    title: "Shared Code",
    html: <SharedCode/>
  },
  {
	title: "Commands",
	html: <Commands/>
  },
  {
	title: "State Machines",
	html: <StateMachines/>
  }
]

export const SoftwareProjectStructureMetadata: DocumentationMetadata = {
  path: "software-project-structure",
  title: "Software Project Structure",
  description: "Common Software Project Structure trends",
  lastUpdated: "April 2026",
  introduction: <SoftwareProjectStructureIntroduction/>,
  sections: sections,
}