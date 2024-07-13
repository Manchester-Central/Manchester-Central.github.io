import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { Geometry } from "./geometry";
import { Vectors } from "./vectors";
// import { WhereItGoesWrong } from "./where-it-goes-wrong";

const sections: DocumentationSection[] = [
	{
		title: "Geometry",
		html: <Geometry/>
	},
	{
		title: "Vectors",
		html: <Vectors/>
	}
]

export const Math1Metadata: DocumentationMetadata = {
  path: "math1",
  title: "Math: General",
  description: "General Math Knowledge someone new to FRC should know",
  lastUpdated: "July 2024",
  introduction: <Introduction/>,
  sections: sections,
}