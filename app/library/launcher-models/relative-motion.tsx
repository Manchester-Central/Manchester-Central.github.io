"use client";

import { MathJax } from 'better-react-mathjax';
import Image from 'next/image';
import vectorimg from './images/vectors.png';

export function RelativeMotion() {
    return <>
		<p>
			There are many reference frames to use when talking about movement, but picking a
			specific reference frame and staying consistent (and being able to swap between them)
			is important for advanced robotics, rocket science, and a whole lot more.
		</p>

		<p>
			You can sit on a train, playing with marbles on a table top, and what you perceive as a
			marble moving 1 meter per second away from you, is in fact a marble moving 1 meter per
			second faster than a train. This scales up into 3 dimensions cleanly, and a marble moving
			away from you and to the left at 1.2 meters per second is also moving forward and left more
			than the train is. This can be represented as something called Vector Addition.
		</p>

		<p>
			There's a video from the show Mythbusters that
			<a href="https://www.youtube.com/watch?v=BLuI118nhzc">illustrates</a> this decently well.
			Bonus points if you recognize what Kari Byron yells out. They are trying to see if they
			released a ball backwards at the same speed as the vehicle it's on is moving, will it stay
			stationary relative to the ground the truck is driving over? You see, these are two different
			reference frames, one is with respect to the truck, and the other is respect to the ground. No
			matter how you setup your equation, the terms should cancel out, and the relative ground speed
			between asphalt and the ball is 0.
		</p>

		<p>
			That's a really trivial case though, what happens in the more <i>real world</i> environments?
			Well, the same thing really. Instead of adding single values together, you add multiple ones.
			See the diagram below, and observe that the x and y values are both going through the same thing.
		</p>

		<div className="centered-content">
			<Image src={vectorimg} width={300} height={300} alt="Vectors" />
		</div>
		<div className="centered-content">
			Seen here as: <i>actual = aim+moving</i>
		</div>

		<p><br />
			If you were to take the <i>moving</i> vector and add it to the <i>aim</i> vector, you would get the
			<i>actual</i> vector. You can line this up visually and take the tail of the <i>moving</i> vector
			(side without the arrow) and place it over the tip of the <i>aim</i> vector (side with the arrow tip),
			and see how the tip of the <i>moving</i> vector touches the tip of the <i>actual</i> vector. This is a
			core concept of Linear Algebra.
		</p>

		<p>
			More formally, this can be written as:

			<MathJax suppressHydrationWarning>{`
			\\begin{equation}
				v_{final} = \\sum_v v
			\\end{equation}
			`}</MathJax>
		</p>
    </>;
}