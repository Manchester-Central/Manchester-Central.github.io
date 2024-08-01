import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { Stats } from "./stats";
import { Physics } from "./physics";

const sections: DocumentationSection[] = [
	{
		title: "Statistics",
		html: <Stats/>
	},
	{
		title: "Physics",
		html: <Physics/>
	},
]

export const Math2Metadata: DocumentationMetadata = {
  path: "math2",
  title: "Math: Intermediate",
  description: "More sophisticated techniques an FRC student should aim to learn before graduating",
  lastUpdated: "July 2024",
  introduction: <Introduction/>,
  sections: sections,
}