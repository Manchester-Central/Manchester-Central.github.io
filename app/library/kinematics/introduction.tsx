export function Introduction() {
    return <>
        <p>
			Kinematics here is distinct from Newton's <a href="/library/math2#Physics">kinematic equations</a>.
			Rather than describing the motion of an object or particle, we're discussing the motion
			of connected bodies to calculate a final position and orientation. This is known as
			Forward or Direct Kinematics.
        </p>

		<p>
			As the name would imply, there's also something called Backwards or Inverse Kinematics.
			This is a much harder problem of finding a viable set of orientations of connected parts
			that can achieve a desired final configuration.
		</p>
    </>;
}