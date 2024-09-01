import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { Forward } from "./forward";
import { Inverse } from "./inverse";

const sections: DocumentationSection[] = [
	{
		title: "Forward Kinematics",
		html: <Forward/>
	},
	{
		title: "Inverse Kinematics",
		html: <Inverse/>
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