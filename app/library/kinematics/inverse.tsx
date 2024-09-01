import Image from 'next/image';

import simpleinv from './images/simple_inverse.png';
import threelink from './images/3link_inverse.png';

export function Inverse() {
    return <>
		<p>
			This is a section on inverse kinematics. Deducing orientations of segments to
			achieve a desired end location and orientation.
		</p>

		<hr />

		<strong>Degrees of Freedom</strong>

		<p>
			The thing that makes inverse kinematics difficult is the potentially infinite
			set of configurations. You can't pick an angle or motor position, when there
			are 360 degrees of viable data point. You <i>could</i> pick a random value in
			a range, but aligning that point with other joints in the system leads to
			cascading constraints that may have to be undone and recalculated.
		</p>

		<div className="centered-content">
			<Image src={simpleinv} alt="Basic Inverse Kinematic Example" />
		</div>

		<p>
			Lets look at a really basic situation. In the above image, you can see the
			state of the arm, and the red dot is where the arm wants to end at. In this
			trivial example, there are two ways to get there! Image B and C show the two
			solutions. By adding another joint, the number of solutions hits an infinite
			number of solutions.
		</p>

		<hr />

		<strong>Many Solutions, Handle It!</strong>

		<p>
			We can't really resolve this cleanly. There are many techniques for resolving
			inverse kinematic problems; Jacobian, Gradiant Descent, and Heuristic to name
			a few. In the example below, you can see two solutions because the technique
			used applied a specific constraint, that the last segment would approach from
			a specific angle/position. This is called the heuristic model. Gradiant descent
			involves slightly changing some or many of the angles to achieve the new target.
			We will not be addressing Jacobian solutions in this article, but encourage
			our daring readers to check it out themselves.
		</p>

		<div className="centered-content">
			<Image src={threelink} alt="3 Link Inverse Kinematic Example" />
		</div>

		<p>
			Somewhat paradoxically, introducing constraints can make many problems in life
			easier. Formal proofs in math benefit from this in <i>Proof by Cases</i>, it
			can encourage creative thinking in difficult environments, and eliminating
			options can help people with <i>Analysis Paralysis</i>.
		</p>

		<p>
			As a result, most complex systems function with these simpler faster models, and
			typically don't use a Jacobian model, and they eliminate as many joints from the
			system as they can afford. This also benefits the mechanical team, as joints are
			some of the weaker parts of a robot.
		</p>

		<hr />

		<strong>More Resources</strong>

		<ul>
			<li><a href="http://motion.pratt.duke.edu/RoboticSystems/InverseKinematics.html">Robotic Systems</a>, Duke.</li>
			<li><a href="https://hive.blog/hive-196387/@juecoree/forward-and-reverse-kinematics-for-3r-planar-manipulator">Forward and Reverse Kinematics for 3R Planar Manipulator</a></li>
		</ul>
    </>;
}
