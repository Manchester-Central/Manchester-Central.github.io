import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { Forward } from "./forward";
import { Inverse } from "./inverse";
import { Kinematics2025 } from "./kinematics2025";

const sections: DocumentationSection[] = [
	{
		title: "Forward Kinematics",
		html: <Forward/>
	},
	{
		title: "Inverse Kinematics",
		html: <Inverse/>
	},
  {
    title: "2025 Kinematics Model",
    html: <Kinematics2025/>
  }
]

export const KinematicsMetadata: DocumentationMetadata = {
  path: "kinematics",
  title: "Kinematics",
  description: "Discussing the techniques of direct and inverse kinematics.",
  lastUpdated: "July 2024",
  introduction: <Introduction/>,
  sections: sections,
}