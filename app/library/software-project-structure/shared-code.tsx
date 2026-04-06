// import Image from 'next/image';
// import tangentvector from './images/tengentvector.svg';
"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import 'highlight.js/styles/github-dark.css';

export function SharedCode() {

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <>
		<p>
			Shared Code is a rolling code repository of features, math, and frequent data structures. There are many sections within the <a href="https://github.com/Manchester-Central/CHAOS-Shared-Code/tree/main/src/main/java/com/chaos131">java source folder</a>.
		</p>

		<table><tbody>
			<tr><td>can</td><td>Enums used to help leverage the Java Language Server's ability to find multiple usages to track down multiple motors with the same ID.</td></tr>
			<tr><td>ctre</td><td>Extenders for CTRE devices with additional helper functions, motor sim integrations, and tuner helpers.</td></tr>
			<tr><td>gamepads&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Extender for the WPILib controller interfaces that includes deadband support and trigger wrappers.</td></tr>
			<tr><td>physics</td><td>Contains math functions for common robotics problems related to physics. Currently just launcher models.</td></tr>
			<tr><td>pid</td><td>Deprecated. Don't worry.</td></tr>
			<tr><td>poses</td><td>Code generated data structures containing mirrored and pivoted pose symmetry for aprils tags.</td></tr>
			<tr><td>robot</td><td>Data structures and wrappers that replace or extend AdvantageKit and WPILib common robot classes.</td></tr>
			<tr><td>swerve</td><td>Deprecated. We use the CTRE / AdvantageKit template now.</td></tr>
			<tr><td>tables</td><td>Lookup table support.</td></tr>
			<tr><td>util</td><td>Common data structures used across the other modules.</td></tr>
			<tr><td>vision</td><td>Set of classes to handle Limelights and potentially other odometry.</td></tr>
		</tbody></table><br />

		<p>
			Some of the sections are detailed below.
		</p>

		<hr />

		<strong>CTRE</strong>

		<p>
			There are a series of TalonFX classes for connecting to CTRE motors using the Phoenix API. Each function to create the wrapper
			or setup the a simulation has all of the necessary variables bundled into the function call to make sure each feature is properly configured.
		</p>

		<p>
			With one small exception. There can't be a general unified motor sim that handles all situations. So there's a CtreMotorSimValues data structure to bundle a DCMotorSim, this must be a type of LinearSystemId. For a rotating mechanism, this is probably a createSingleJointedArmSystem() call. For an elevator mechanism, this is probably a createElevatorSystem(). A flywheel should probably be createFlywheelSystem(). Any other motor sim should have a custom implementation or default to a generic createDCMotorSystem(). More complex mechanisms (like multi jointed arms) can typically be simplified to a basic SingleJointedArmSystem. Not every sim needs to be a value rich simulation.
		</p>

		<hr />

		<strong>Physics</strong>

		<p>
			This is full of calculation stubs and student implemented calculations for various kinematics and moment problems. Currently, there are very few implemented functions, and some may not ever be handled but the signature pattern is established here. All similar functions should fit these function signatures. For instance, each launcher function should at least 3 arguments: robot pose (Pose2d/3d), robot to release position (Transform2d/3d), target or goal position (Pose2d/3d). Then any further constraints should be added, like a release angle, robot velocity, etc.
		</p>

		<strong>Poses</strong>

		<p>
			Leverages code generation with unit tests to convert an AprilTag map from Limelight into a list of named April Tag positions. The code gen setup is very simple, and can be configured with tag validation to generate unit tests which will confirm the tags were generated correctly. To add a new fmap, add the following fields to the list of configs. All generated poses are use the Blue Alliance origin, where the +x direction is forward into the field, +y is to the left, and +z is up into the air. This is considered the standard coordinate frame among the FRC community with a few exceptions, most notably <a href="https://docs.limelightvision.io/docs/docs-limelight/pipeline-apriltag/apriltag-coordinate-systems">Limelight</a> which uses the coordinate system Centered-Red.
		</p>

		<ol className="list-decimal">
			<li>Class Name for the Generated Source File</li>
			<li>Parent Type (MirroredFieldPose or PivotedFieldPose)</li>
			<li>Fmap File Name</li>
			<li>List of Tag Pairs</li>
		</ol><br />

		<p>
			MirroredFieldPose is for fields when the FRC field uses mirrored symmetry, an example of this was in 2023's Charged Up where the resource pickup zones were on the same wall, and 2024's Crescendo where the Amp was on the same wall. The other common type of symmetry is the rotational symmetry, or pivoted symmetry, we call PivotedFieldPose. An example of this is how the barge and climb in 2025 was on the left side from the driver's perspective, or 2026 where the outpost and depot are on the right and left side of the driver's perspective (among other things off the centerlines).
		</p>

		<strong>Tables</strong>

		<p>
			Largely used for flywheel tables for launchers, this is exctly what you expect, but a little more. It's a generic java datastructure that can be extended with additional nuance and controls. For instance, in 2026:
		</p>

<pre><code className="language-java">
{`// Table Definition
public class FlywheelTable extends LookupTable<DistanceUnit, Distance, TableRow> {
	...
}

// Using the Table
FlywheelTable.getInstance().performLookup( FunctionThatReturnsDistance() );`}
</code></pre>

		<p>
			With this, any class or function can leverage a publicly static lookup table, and retrieve linearly interpolated values. There are no non-flywheel use cases identified, but the class remains generic all the same in case that scenario comes into scope.
		</p>

		<strong>Vision</strong>

		<p>
			A few data structures related to April Tags, types of vision data (pose, and targetting), projective geometry calculations, and the abstract camera interface that handles data recording and replay via AdvantageKit.
		</p>

		<p>
			The projective geometry functions are related to the <a href="/library/dynamic-crop">Dynamic Crop</a> feature, which shrinks the processing and problem space for the limelight's computer vision and pose estimation capabilities. This enables higher resolution updates, at higher speeds by ignoring pixels that won't / can't include an april tag.
		</p>

		<p>
			Abstract camera interfaces exist to make the interface between a Limelight, PhotonVision, or other camera based pose estimator more similar to eachother. This design allows us to swap cameras in without having to re-learn an interface or behavior. At one point, the team was considering PhotonVision over Limelight. However the team has moved in the direction of QuestNav, which doesn't support the range of features like game piece tracking, or changing camera specs. It's largely a black box with little-to-no configurations options. As a result, it has not been brought under the fold of this abstraction and it's unlikely to ever get integrated.
		</p>
    </>;
}
