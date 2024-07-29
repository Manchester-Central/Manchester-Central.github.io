import Image from 'next/image';
import tangentvector from './images/tengentvector.svg';

export function RotationalMovement() {
    return <>
		<p>
			Rotational movement is a more complicated beast. This component uses a blend of linear and angular terms. We
			must once again look to our <i><a href="http://127.0.0.1:3000/library/math1#Geometry">arc length</a></i> math
			and think of the motion as it's happening around a circle. We're using some of the same principles, distance
			over time is velocity, but we're goint to start describing some of it in new terms.
		</p>

		<div className="centered-content">
			<Image src={tangentvector} width={300} height={300} alt="Vectors" />
		</div>

		<p>
			At each moment in time, rotational movement happens along a tangent vector. If you notice the above image,
			you can see the tangent vector in red is 90 degrees from the point relative to the origin. You can also
			observe that the distance between the tangent vector and the curve is larger the farther down the vector you go.
			What stops this from moving along that vector direction forever? The <i><a href="https://en.wikipedia.org/wiki/Centripetal_force">centripetal force</a></i>!
		</p>

		<p>
			The centripetal force is intrinsic to the design of the robot, not something to be calculated. It's the tension
			in the body as the wheels try to shoot off in their own directions, but the robot body keeps them a certain distance
			away from the axis of rotation (typically also the robot origin).
		</p>

		<p>
			What all of this means, is that the rotation vector is always the same direction from the robot relative
			coordinates, the only thing that changes is the magnitude.
		</p>
    </>;
}
