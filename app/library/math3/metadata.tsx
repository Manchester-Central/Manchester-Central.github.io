import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { LinearAlg } from "./linear-alg";
import { Calculus } from "./calculus";
import { Physics } from "./physics";
import { Stats } from "./stats";
import { MachineLearning } from "./machine-learning";
import { Cameras } from "./cameras";

const sections: DocumentationSection[] = [
	{
		title: "Linear Algebra",
		html: <LinearAlg/>
	},
	{
		title: "Calculus",
		html: <Calculus/>
	},
	{
		title: "Physics",
		html: <Physics/>
	},
	{
		title: "Statistics",
		html: <Stats/>
	},
	{
		title: "Machine Learning",
		html: <MachineLearning/>
	},
	{
		title: "Camera Systems",
		html: <Cameras/>
	},
]

export const Math3Metadata: DocumentationMetadata = {
  path: "math3",
  title: "Math: Advanced",
  description: "Advanced material for seniors",
  lastUpdated: "July 2024",
  introduction: <Introduction/>,
  sections: sections,
}