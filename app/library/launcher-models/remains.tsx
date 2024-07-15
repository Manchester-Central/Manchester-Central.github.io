"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';
import descentimg from './images/descent.png';
import robot2024 from './images/2024robot.png';

export function Remains() {
    return <>
		<strong>Transfer Alignment</strong>

		<p>
			Robots typically don't function in terms of velocity vectors. We've figured out how to
			calculate an arc from 1 point to another, but not how to use it in reality. That is a
			problem that's robot dependent. So lets talk about them at a high level.
		</p>

		<p>
			Transfer Alignment is the synchronization between a launcher devices's coordinate frame,
			and the platform's origin. In FRC, we typically don't deal with transfer alignment at the
			same complexity as professional projects, but the core idea remains. We need to account
			for the sensor/encoder results, and relate them to the actual position of the launcher
			mechanism relative to the <i>inertial frame</i> (aka, the robot origin).
		</p>

		<div className="centered-content">
			<Image src={robot2024} width={300} height={300} alt="Vectors" />
		</div>

		<p>
			In Chaos' 2024 robot design, we used 3 vectors and a few rotations to determine the release
			point as seen with the blue arrows above.
		</p>

		<p>
			Each arrow describes some constant distance, or scalable distance, and a potential rotation
			around that point. If you imagine the lift moving up and down, you will see that middle blue
			arrow expand and shrink, however the other arrows will remain the same. By calculating each
			arrow individually, rotating them when necessary, and then adding them all together, you can
			calculate where the release point is relative to the robot origin at any given point.
		</p>

		<p>
			You can see a similar set of calculations done in
			<a href="https://github.com/Manchester-Central/2024-Crescendo/blob/main/src/main/java/frc/robot/RobotContainer.java#L145C46-L145C62">RobotContainer's constructor</a>,
			where the rear camera has its offset handler defined. These are almost the same vectors as the
			one to the launcher's release point.
		</p>
		
		<hr />

		<strong>Velocity to Mechanism</strong>

		<p>
			Motors rarely understand commands to "speed". What they do understand is a command to rotate, or move to an
			angular position. This is another robot specific problem, but it's usually simple enough to convert RPM to
			velocity with some error. Trivially, that's just the number of rotations per second, times the circumference
			of the wheels delivering the force. Unfortunately physics has a nasty habit of complicating things, and there
			will always be some loss in the conversion.
		</p>

		<p>
			Ideally, you would model this with a speed gun. However that's unlikely to be viable.
		</p>

		<p>
			The next best way is to fiddle with the RPM value given a velocity, and see what value matches the target
			velocity. This is more or less how a lookup table (also called flywheel table) functions. The difference
			is that once that table is generated you can fit an accurate polynomial curve to the points which should be
			more precise than just a flywheel table.
		</p>

		<p>
			Using this equation, you can bake in the loss and estimate the deviation in the model. Every mechanism that's
			converting energy suffers some loss, and we see loss in our 2024 robot's system by the vibrations in the note,
			and the skipping along the note's surface. We don't actually get the note to release at 100% conversion rate,
			but closer to 50%.
		</p>
    </>;
}