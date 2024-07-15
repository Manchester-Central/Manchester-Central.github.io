"use client";

import { MathJax } from 'better-react-mathjax';
import VeloAtHeightDemo from './components/launcher-demo';
import LandingForAngleDemo from './components/landing-demo';

export function SolveFor() {
    return <>
		<p>
			If you're thinking ahead, you can typically reduce the problems to a lower dimension,
			or solve for a specific case. If you notice above, some equations cancel one term or
			another out. For instance, notice how the first kinematic equation listed doesn't include
			an acceleration? How about the last one not having a distance variable? This is powerful,
			because it allows you to setup solutions to specific problems.
		</p>

		<hr />

		<strong>Vertical Velocity At A Height</strong>

		<p>
			One thing you might want to accomplish is launching at a higher target, and guaranteeing
			a certain velocity at a desired height creates constraints that can make the calculations
			simpler. Lets take a trip and break down all of this step by step.
		</p>

		<p>
			By focusing on the velocity at a specific height, you can solve for the time to reach that
			height since that time value plays two parts. (1) It can be passed into other functions to
			generate more values, and (2) it can convert distance vectors into velocity vectors.
			If you look at the list of 4 equations above, none of them quite fit our needs. But we do have
			the tools to calculate time via another important step in this process. We can calculate our
			initial vertical velocity based on gravity, and the vertical distance to rise. This can then
			be used in one of the original equations to calculate the time to that velocity.
		</p>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				v_{yf}^2 &= v_{y0}^2 + 2a\\Delta x \\\\
				v_{y0}^2 &= v_{yf}^2 - 2a\\Delta x \\\\
				t &= \\frac{v_{yf}-v_{y0}}{a}
			\\end{aligned}
			`}</MathJax>
		</div>

		<p>
			That's great! You now have the vertical velocity component for our 3 dimensional launch vector,
			<i>AND</i> you know how long it will be in the air. The other terms can be deduced to match the
			units and context.
		</p>

		<p>
			We need to solve the horizontal velocity components now. What's convenient about this technique
			is that we can calculate the horizontal distance, and convert that into a velocity component to
			plug into our launch vector. There's one catch, what if our robot is moving while it's launching?
			Think back to the earlier sections! We only have a parabolic curve in the vertical direction
			because we don't have any acceleration in the horizontal directions. In other words, when we add
			our motion vectors together, we get an effective vector, which also means that we can remove one
			vector from another as well.
		</p>

		<p>
			So as you can see below, we take the ground distance, divide it by the time value we found earlier
			to establish the velocity needed to reach that distance in the correct amount of time. Then we can
			subtract the robots velocity in the same field coordinates to counteract the influence it will have
			in reality.
		</p>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				v_{ground} = \\frac{target_{position} - current_{position}}{t} - current_{velocity}
			\\end{aligned}
			`}</MathJax>
		</div>

		<p>
			Tada! In just 4 equations, you have calculated a velocity release vector. Below, you can see the
			equations put together in an interactive demo:
		</p>

		<div className="centered-content">
			<VeloAtHeightDemo />
		</div>
		<br />

		<p>
			One thing that's interesting about this solution is that if you pass a negative velocity target,
			the calculated release arc will continue over the peak and reach the target on the down slope.
			Move the position and velocity sliders around and mess around with the variables to see how that
			would affect the release trajectory. Does it all pass the gut check?
		</p>

		<hr />

		<strong>Location Given An Angle</strong>

		<p>
			Another situation might be launching <i>over</i> something. You aim up high, and figure out the
			curve that will match the location you want the projectile to land on. While there are lower
			angles that can produce the desired landing spot, a higher angle is more likely to "stick the
			landing". Any fixed angle will work, but the larger angle is more likely to be useful.
		</p>

		<p>
			So lets assume we're launching at a known max angle, and we know both our height difference,
			and our ground distance. This means we know the ratio between our vertical and horizontal speeds,
			and can substitute one for the other. Lets see where this takes us!
		</p>

		<p>
			Lets note the important relationship between the X and Y values of v<sub>0</sub>, and describe
			the y direction as up in the air, and the x direction as ground line directly to the bottom of
			the target.
		</p>

		<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				\\hat{y} &= sin(\\theta)v_0 \\\\
				\\hat{x} &= cos(\\theta)v_0 \\\\
				\\hat{y} &= \\frac{sin(\\theta)}{cos(\\theta)}\\hat{x}
			\\end{aligned}
		`}</MathJax>

		<p>
			Our horizontal distance equation is relatively straight forward. The time it takes for the
			projectile to travel horizontal is just the distance traveled divided by the speed.
		</p>

		<p>
			Our vertical and second equation is a little more complex. We can't easily break this problem
			up into parts like we did before, it just doesn't have a clear and direct path to the answer.
			So lets see what we can substitute and rearrange to get somewhere nice.
		</p>

		<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				t &= \\frac{d}{|\\hat{x}|} \\text{(aka, distance / speed)} \\\\
				\\Delta x &= \\hat{x}t + \\frac{1}{2}at^2 \\\\
				\\Delta y &= \\hat{y}t + \\frac{1}{2}at^2 \\\\
				\\\\
				\\Delta y &= \\frac{sin(\\theta)}{cos(\\theta)}\\hat{x}t + \\frac{1}{2}at^2 \\\\
			\\end{aligned}
		`}</MathJax>

		<p>
			We still have 2 unknown variables still. This sounds like a difficult problem, but
			it's really not. What else could you substitute in here that would fit our needs? With
			just one more substitution, you can then simplify and solve for x.
		</p>

		<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				&= \\frac{sin(\\theta)}{cos(\\theta)}\\cancel{\\hat{x}}\\frac{d}{\\cancel{\\hat{x}}} + \\frac{1}{2}(-9.81)(\\frac{d}{\\hat{x}})^2 \\\\				
				\\frac{sin(\\theta)}{cos(\\theta)}d - \\Delta y &= \\frac{9.81d^2}{2} \\frac{1}{\\hat{x}^2} \\\\
				\\hat{x}^2 &= \\frac{\\frac{9.81d^2}{2}}{\\frac{sin(\\theta)}{cos(\\theta)}d - \\Delta y} \\\\
				\\hat{x} &= \\sqrt{\\frac{4.905d^2}{\\frac{sin(\\theta)}{cos(\\theta)}d - \\Delta y} }
			\\end{aligned}
		`}</MathJax>

		<p className="question">
			After solving that, and remembering what we said about vector addition and launching into
			the speaker while moving, what would you do to to the launch vector so that we could
			shoot on the move here too?
		</p>

		<p>
			This type of problem involves something called systems of equations. We have taken 2 different
			but tightly coupled equations that may or may not have a solution, and found a solution that
			fits the intersection of both. Substitution is a very powerful technique that works with simpler
			scenarios, and luckily this case is just simple enough for it to work.
		</p>	

		<div className="centered-content">
			<LandingForAngleDemo />
		</div>
    </>;
}