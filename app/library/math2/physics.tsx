"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';

export function Physics() {
    return <>
		<p>
			This is a short section on early education Physics. All topics are
			ideal case scenarios with frictionless cows and the like.
		</p>

		<hr />

		<strong>Newtons Equations</strong>

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

		<hr />

		<strong>Torque</strong>

		<hr />

		<strong>Tension</strong>

		<hr />

		<strong>Elastic Collisions</strong>
    </>;
}