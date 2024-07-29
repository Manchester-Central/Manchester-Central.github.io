export function TranslationalMovement() {
    return <>
        <p>
			Translational movement is very straight forward. Quite literally! Each wheel is aligned in
			the same direction, and moves at the same rate. If they are misaligned, the robot will start
			to diverge and slowly accumulate error (ie, go off track). This is normal but still
			undesirable, and can be fixed with odometry from camera systems.
		</p>

		<p>
			The speed is determined by the wheel dimensions and the motor's effective RPM. This uses a
			concept called <i><a href="http://127.0.0.1:3000/library/math1#Geometry">arc length</a></i>.
			Essentially, it's the circumference of the wheel multiplied by the number of rotations. Only
			rotated the axle 1/3 of the way around? That results in a linear distance of 1/3 of the
			circumference.
		</p>

		<p>
			It's important to keep this movement in <i><a href="http://127.0.0.1:3000/library/math1#Vectors">vector</a></i> format.
			In this way, the length or magnitude of the vector defines the speed, and the component's
			relative values decide the angle. The vector is describing the motion of the robot in either field
			relative, or robot relative coordinates. Typically the calculations are done in robot
			relative coordinates, and the controls are handled in field relative coordinates. This
			requires a coordinate frame shift the depends on the field position and layout. For the remainder
			of this article the terminology will be ambiguous as the math applies to both cases the
			same. However you, the reader, should pick one coordinate frame and stick with it.
		</p>
    </>;
}