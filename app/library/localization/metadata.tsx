import { DocumentationMetadata, DocumentationSection } from "@/app/library/documentation";
import { Introduction } from "./introduction";
import { AprilTags } from "./april-tags";
import { Limelight } from "./limelight";
import { PoseEstimate } from "./pose";
import { Calibration } from "./calibration";
import { Sensors } from "./sensors";
import { Stereo } from "./stereo";

const sections: DocumentationSection[] = [
	{
		title: "April Tag Background",
		html: <AprilTags/>
	},
	{
		title: "Limelight",
		html: <Limelight/>
	},
	{
		title: "Calibration",
		html: <Calibration/>
	},
	{
		title: "Sensor Integration",
		html: <Sensors/>
	},
	{
		title: "Pose Estimation",
		html: <PoseEstimate/>
	},
	{
		title: "Stereo Imagery",
		html: <Stereo/>
	},
]

export const LocalizationMetadata: DocumentationMetadata = {
  path: "localization",
  title: "Robot Localization",
  description: "Explaining how an FRC robot understands where it is.",
  lastUpdated: "July 2024",
  introduction: <Introduction/>,
  sections: sections,
}