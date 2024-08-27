"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';

import feedforward from './images/feedforward.png';
import pid from './images/pid.png';
import pid_animated from './images/pid_animated.gif';

export function PID() {
    return <>
        <p>
			The second critical aspect of making swerve drive <i>swerve</i> is something called
			PID loops. PID Loops are a tool to more smoothly transition between values reducing
			chances of mechanical damage, and mitigate any power system turbulence. Below is a
			diagram of a PID loop with a feed forward component.
		</p>

		<div className='centered-content'>
			<Image src={feedforward} alt={'Feed Forward PID Loop'} />
		</div>

		<p>
			There are two important sections in this diagram, the first is the 3 channels of
			P, I, and D circled in green. These stand for Proportional, Integral, and Derivative,
			respectively. The second important part is the feed forward box circled in red. All
			4 components are added together (that's what the &Sigma; in the circle means) and
			become the final output value. That value could be volts, amps, or something else
			entirely. Lets briefly talk about each term.
		</p>

		<ul>
			<li>
				- P(roportional) takes some proportion of the difference between the current value,
				and the desired value. It's easiest to pretend this is some percentage for now,
				and a 10% P value will move the current value 10% closer. This is the same thing
				as <a href="https://en.wikipedia.org/wiki/Zeno%27s_paradoxes#Dichotomy_paradox">Zeno's Paradox</a>.
				If your P value is greater than 100% you get oscillation, less than 100% will
				stabilize over time. The lower the value the longer it takes to stabilize. Actual
				proportional values are rarely ever in percentage form, however it is easier to
				think of them that way.
			</li>
			<li>
				- I(ntegral) takes into account the gap between what it is, and what is missing.
				This is a calculus concept, that describes the "area under the curve" and is
				frequently described as an accumulation of error. This is handy because eventually
				the Proportional value stops being able to change the output with incredibly small
				numbers. So the integral component accumulates those small values into a larger
				value instead.
			</li>
			<li>
				- D(erivative) is another calculus concept. If you add an Integral value into
				the PID loop, you may find that your system starts off oscillating significantly.
				This component looks at how sharply the system is changing and limits the strength
				of it.
			</li>
			<li>
				- Feed Forward is a constant value put into the final sum. This can be a value
				representing static/kinetic friction, the force of gravity, or some other known
				force opposing the system. It can also be used as an arbitrary constant to seed
				the PID loop with a starting value.
			</li>
		</ul><br />

		<p>
			The goal is to take a potentially turbulent or imprecise system, and have it self
			correct over time. Below is a rough approximation of a PID system stabilizing over
			time. The first line we want to pay attention to is the red one, and consider the
			low Ki value with the Kp of 1. Here the Ki is low enough to be insignificant.
			As the Kp is raised to 2 (the black line) you start to see oscillation. That's not
			good! We introduce our third term, the Kd value, to tell it to not spike up so
			sharply, especially near our target. This produces a curve that still corrects
			the error in the system up to that point, but stabilizes to the target value
			faster than any of the other curves.
		</p>

		<div className='centered-content'>
			<Image src={pid} alt={'Feed Forward PID Loop'} unoptimized />
		</div><br />

		<p>
			Here's another animated example that heavily uses the proportional and integral
			component creating oscillation, and then relies on a large derivative component
			to prevent the oscillations from causing any damage and smoothing out the curve
			incredibly quickly.
		</p>

		<div className='centered-content'>
			<Image src={pid_animated} alt={'Feed Forward PID Loop'} />
		</div>

		<p>
			Lastly, it's important to remember that the units of these values matter, and
			everything discussed here is hypothetical. The actual values used are typically
			in some practical units, like Volts or Amps. It's always best when tuning to
			start with the <i>documentation</i>. Pick a deliberately low value for P, adjust
			as desired, and then move through the P, I, and then D values as needed. Try to
			reserve feed forward values for situations with a known resistance, like
			rotational friction when moving sideways, or the force of gravity on a lift,
			or use it to balance the system in practice when behavior is not consistent
			in all contexts.
		</p>

		<p>
			More PID resources:
		</p>

		<ul>
			<li><a href="https://www.ni.com/en/shop/labview/pid-theory-explained.html">NI</a> (Examples with LabVIEW)</li>
			<li><a href="https://www.wevolver.com/article/mastering-pid-tuning-the-comprehensive-guide">Wevolver</a> (General Knowledge)</li>
			<li><a href="https://blog.mbedded.ninja/programming/general/pid-control/">mbedded.ninja</a> (Code snippets are in C and C++)</li>
		</ul><br />

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
