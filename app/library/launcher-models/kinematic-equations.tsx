"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';
import vectorimg from './images/vectors.png';

export function KinematicEquations() {
    return <>
		<p>
			Linear algebra and vectors are cool and all, but what happens after the piece is up in the air
			in free fall? It experiences a different type of motion called a parabolic trajectory. These can be
			calculated with a series of equations listed below:
		</p>

		<div className="centered-content">
			<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				\\Delta x &= \\frac{v_f+v_0}{2}t \\\\
				\\Delta x &= v_0t + \\frac{1}{2}at^2 \\\\
				v_f^2 &= v_0^2 + 2a \\Delta x \\\\
				v_f &= v_0 + at
			\\end{aligned}
			`}</MathJax>
		</div>

		<p>
			Some of these are quite linear, by being able to drop larger polynomial terms we get equations
			like the last one. These are very powerful when used efficiently. They can also be used in pieces,
			solving for one thing, then swapping to another to leverage that intermediate value. Or they can be
			combined into a systems of equations to derive the intersection of two aspects.
		</p>

		<p>
			For instance, you can calculate the time to reach the peak of an arc with
			(Note: signs are important, keep the coordinate system consistent):
			<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				\\cancel{v_p} 0 &= v_0 +at \\rightarrow t=\\frac{-v_0}{a}\\\\
				\\Delta x_p &= (\\frac{\\cancel{v_p}+v_0}{2})t \\\\
				\\Delta x_p &= \\frac{v_0}{2} * \\frac{-v_0}{a}
			\\end{aligned}
			`}</MathJax>
			
			Then solve for the descent with:

			<MathJax suppressHydrationWarning>{`
			\\begin{aligned}
				\\Delta x_f = \\cancel{v_pt} + \\frac{1}{2}at^2
			\\end{aligned}
			`}</MathJax>
			
			Solving it this way also cancels out many terms in the process. You can also substitute the equations
			into eachother to derive new ones. Just be careful when combining equations and parts that the terms
			are aligned with the correct moment.
		</p>
    </>;
}