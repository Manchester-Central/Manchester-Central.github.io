"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';
import descentimg from './images/descent.png';

export function FullModel() {
    return <>
		<p>
			One issue with the earlier models is that they work well with classical objects. You know the type,
			bowling balls and frictionless spherical cows. Once we start to scale things up and add more complex
			physics (like fluid dynamics, n-body style mechanics, or air resistance), it becomes easier to model
			the process as a multi-round monte carlo simulation (try it with random values), or a something called
			a gradiant descent model. For this, we'll use a greedy form of gradient descent.
		</p>

		<p>
			Gradient Descent is basically just a measurement of slope, and trying to move "downhill".
		</p>

		<div className="centered-content">
			<Image src={descentimg} width={300} height={300} alt="Vectors" />
		</div>

		<p>
			Here you can see a 2d example that looks sort of like a bullseye. If you've ever seen a topological or
			height map (for instance the lines around a mountain peak on a map) you will see the same effect here.
			The middle ring is the lowest value, and each ring around it is a "higher point" in the data.
		</p>

		<p>
			As algorithm designers, we can choose what those values are, and how they related to our problem set.
			So lets put a little bit of thought into this then! As the projectile travels the length of the arc,
			we can plot the minimum distance of that curve to the target location. We will make incremental adjustments
			to get there, and eventually we will get within a tolerance. This is what the name iteration to convergeance
			means, iterate until the values stop changing a meaningful amount.
		</p>

		<p>
			TODO: One more demo, with user input.
		</p>
    </>;
}