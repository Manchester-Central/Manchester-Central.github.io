"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';

import ff from './images/feedforward.png';
import pid from './images/pid.png';
import pid_animated from './images/pid_animated.gif';

export function PID() {
    return <>
        <p>
			The second critical aspect of making swerve drive <i>swerve</i> is something called
			PID loops. PID loops are a technique for stabilizing current, managing error, and
			staying on target. They are robot dependent values that take into account things
			like weight when helping the robot shift from one level of energy consumption to
			another. You can see a deeper dive into PIDs in another <a href="/library/math2#Physics">article here</a>.
		</p>

		<p>
			From this point, it's difficult to guide a specific way to convert these equations into
			motor movements and calibration profiles. Different hardware companies and offer different
			APIs and ways to convert these vectors into angles and and velocities, and internal pid
			controllers to handle precision.
		</p>

		<ul>
			<li><a href="https://v6.docs.ctr-electronics.com/en/stable/index.html">TalonFX</a></li>
			<li><a href="https://docs.revrobotics.com/brushless/revlib/revlib-overview">SPARK / REVLib</a></li>
		</ul><br />

		<p>
			Finally, an example of how you can interact with WPILib's SwerveDriveKinematics and SwerveModuleState
			APIs, and create a compatible interface with the motor vendors APIs, can be found elsewhere
			in <a href="https://github.com/Manchester-Central/CHAOS-Shared-Code/tree/main/src/main/java/com/chaos131/swerve">this git account</a>.
		</p>
    </>;
}
