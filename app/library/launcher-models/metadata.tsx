import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { LauncherIntroduction } from "./introduction";
import { RelativeMotion } from "./relative-motion";
import { KinematicEquations } from "./kinematic-equations";
import { SolveFor } from "./solve-for";
import { FullModel } from "./full-model";
import { Remains } from "./remains";

const sections: DocumentationSection[] = [
	{
		title: "Relative Motion",
		html: <RelativeMotion/>
	},
	{
		title: "Kinematic Equations",
		html: <KinematicEquations/>
	},
	{
		title: "What to Solve For?",
		html: <SolveFor/>
	},
	{
		title: "Full Model: Gradient Descent",
		html: <FullModel/>
	},
	{
		title: "What Remains",
		html: <Remains/>
	},
]

export const LauncherMetadata: DocumentationMetadata = {
  path: "launcher-models",
  title: "Launcher Models",
  description: "This explains how to estimate launcher trajectories",
  lastUpdated: "July 2024",
  introduction: <LauncherIntroduction/>,
  sections: sections,
}