"use client";

import Image from 'next/image';
import { MathJax } from 'better-react-mathjax';
import fwd from './images/forward.jpeg';
import robot from './images/2024robot.png';

export function Forward() {
    return <>
		<p>
			Forward kinematics is a process of manipulating bodies (frequently described as vectors)
			to calculate a new location and orientation.
		</p>

		<hr />

		<strong>Vector/Component Definition</strong>

		<p>
			In one of our <a href="/library/math1#Vectors">math articles</a>, we explain how vectors
			can be added and subtracted. When calculating forward kinematics, it's important to
			understand how to define the vectors. The base vector should be defined with respect
			to an anchoring point, and the length of the vector should be from the attachment point
			(frequently this is the center of an axle) up to another attachment point or axle center.
		</p>

		<p>
			Here you can see a robot arranged at right angles, where +x is to the right, and +y is up.<br />
			v1 = [0,d1]<br />
			v2 = [0,d2]<br />
			v3 = [de,0]<br />
		</p>

		<div className='centered-content'>
			<Image src={fwd} alt={''} />
		</div>

		<p>
			Notice that the length of v1, v2, and v3 are defined by the the distance from the anchor
			point to an axle, axle to axle, or axle to "end effector". Also keep in mind that the
			vectors we described are the current orientation. Each body has a <i>base</i> or
			<i>default</i> decription, and an effective description. This is because as we scale up
			from 1 dimension to 2-3 dimenions we start to factor in rotation.
		</p>

		<hr />

		<strong>Rotation</strong>

		<p>
			Rotation doesn't change the length of the vector, it only changes the values that make it
			up. Think back to our <a href="/library/math1#Geometry">unit circle</a>. That is a vector
			of length 1, and as you rotate the vector around you get different values. The Trig there
			works well when the vector is simply [1, 0], however we usually don't have that luxery in
			the real world. We have to use something called a rotation matrix to change from the base
			values, to the effective values.
		</p>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} cos(\\theta) & -sin(\\theta) \\\\
				sin(\\theta) & cos(\\theta) \\end{bmatrix}
			`}</MathJax>
		</div>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>
				{`v' = R*v`}
			</MathJax>
		</div>

		<p>
			With this matrix and your rotation angle set to 0 degrees, this forms something called
			the identity matrix. Which is a fancy phrase that basically means "multiply by 1", or do
			nothing.
		</p>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} 1 & 0 \\\\
				0 & 1 \\end{bmatrix}
			`}</MathJax>
		</div>

		<p>
			In 3 dimensions you might see the matrices look a little different. These are something
			called Euler Angle rotations.
		</p>

		<div className="centered-content" style={{display: 'flex', alignItems: 'center'}}>
			R<sub>x</sub>=<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} 1 & 0 & 0 \\\\
				0 & cos(\\theta) & -sin(\\theta) \\\\
				0 & sin(\\theta) & cos(\\theta) \\end{bmatrix}
			`}</MathJax>,
			R<sub>y</sub>=<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} cos(\\theta) & 0 & -sin(\\theta) \\\\
				0 & 1 & 0 \\\\
				sin(\\theta) & 0 & cos(\\theta) \\\\
				\\end{bmatrix}
			`}</MathJax>,
			R<sub>z</sub>=<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} cos(\\theta) & -sin(\\theta) & 0 \\\\
				sin(\\theta) & cos(\\theta) & 0 \\\\
				0 & 0 & 1 \\\\
				\\end{bmatrix}
			`}</MathJax>
		</div>

		<p>
			If you know your linear algebra from class, you might recognize that the last matrix
			in the list is the same as the 2 by 2 matrix for points in 3d space. In other words,
			you could use the same x and y points, and an arbitrary point in the z dimension, and
			using that last matrix will transform the points in the same way as the 2 by 2 matrix.
		</p>

		<hr />

		<strong>Chaining</strong>

		<p>
			When we combine both of these together we can get more sophisticated conversions from
			one coordinate from to another.
		</p>

		<div className="centered-content">
			<Image src={robot} width="500" alt="Chaos's 2024 robot" />
		</div>

		<p>
			This is Double Time, the robot from 2024's game Crescendo. Notice how our vectors are
			not neatly aligned along an axis, also keep in mind that the axis are +x left, +z up.
			We don't use y's because +y is the left side of the robot, which is where the camera
			is located. From our <a href="https://github.com/Manchester-Central/2024-Crescendo/blob/main/src/main/java/frc/robot/RobotContainer.java#L148">source code</a>,
			the 3 vectors are<br />V1 = [-0.299, 0, 0.277], V2 = [-0.082, 0, 0.425], V3 = [0.18, 0, 0.177].
		</p>

		<p>
			Each of the vectors does something important. The first one is a constant vector, it
			calculates a joint behind the robot based on the current position and orientation of
			the robot. The next vector is the lift vector, which is normalized to a unit vector,
			and that is then multiplied by the height of the lift along its track. The third vector
			must be rotated around its axle, as it indicates where the release point of the launcher
			with respect to that axle. That uses the R<sub>y</sub> rotation matrix.
		</p>

		<div className="centered-content" style={{display: 'flex', alignItems: 'center'}}>
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} x' \\\\
				y' \\\\
				z' \\end{bmatrix}
			`}</MathJax> = 
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} -0.299 \\\\
				0 \\\\
				0.277 \\end{bmatrix}
			`}</MathJax> + 
			<i>H</i>&nbsp;* <MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} -0.082 \\\\
				0 \\\\
				0.425 \\end{bmatrix}
			`}</MathJax> + 
			<i>R<sub>y</sub></i>&nbsp;* <MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} 0.18 \\\\
				0 \\\\
				0.177 \\end{bmatrix}
			`}</MathJax>
		</div>

		<p>
			This gives us a robot relative vector that describes the game piece release point
			relative to the robot origin. To make that a field relative vector, the resulting
			vector must be rotated again based on the robot's field pose. In most cases, that
			means you just do one more rotation, yielding our final 3d point on the field <br />
			<i>[x'', y'', z'']</i>
		</p>

		<div className="centered-content" style={{display: 'flex', alignItems: 'center'}}>
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} x'' \\\\
				y'' \\\\
				z'' \\end{bmatrix}
			`}</MathJax> = 
			<MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} x \\\\
				y \\\\
				z \\end{bmatrix}
			`}</MathJax> + 
			<i>R<sub>z</sub></i>&nbsp;* <MathJax suppressHydrationWarning>{`
				\\begin{bmatrix} x' \\\\
				y' \\\\
				z' \\end{bmatrix}
			`}</MathJax>
		</div>
    </>;
}