import Image from 'next/image';
import vectorimg from './images/vectors.png';

export function Vectors() {
    return <>
		<p>
			A vector is an organized set of values. Each position represents a specific dimension,
			or aspect of the data. For instance, when calculating the slope of a line on a graph,
			you may take the rise and divide it by the run. This is calculated from y2-y1 and x2-x1,
			right? This also just so happens to describe a vector, seen here &#123; &Delta;x, &Delta;y &#125;.
		</p>

		<p>
			This extends into as many dimensions as you like. Including by 1 dimensional vectors
			(also called scalars), 3 and 4 element vectors like what are used in robotics and video
			games, or even 300 element vectors like in machine learning. All of the techniques we will
			talk about work across any sized vector. A vector is just an organized set of multiple
			numbers, that's it!
		</p>

		<p>
			What's also nifty is that, while people typically use the x - y - z pattern, any order is
			valid so long as it's consistent. For the sake of this library, we will stick with the
			x - y - z pattern.
		</p>

		<hr />

		<strong>Vector Addition</strong>

		<p>
			So we can describe a vector, so what? A lot, actually. Vectors are fundamental to a wide
			range of domains, and the most fundamental of all is vector addition. This is frequently
			called "tip to tail" as memorable visualization of the steps. You see when you place vectors
			tip to tail, and add the &Delta;x components together and then the Δy components together,
			you get a new vector of x and y values. Take this image as an example.
		</p>

		<div className="centered-content">
			<Image src={vectorimg} width={300} height={300} alt="Projection Type Image" />
		</div>

		<p>
			This is an example of what happens when you add two velocity vectors together:
			<i>aim+moving=actual</i>. If you were to slide the moving vector to the right, so that the
			tail of it touched the tip of the aim vector, you would see the tip of moving touch the tip
			of actual. So lets look at the numbers then: aim is &#123;2, 0&#125;, moving is
			&#123;-1, -1&#125;, actual is &#123;1, -1&#125;.
		</p>

		<p className="question">
			What is the vector equation to produce the vector <i>moving</i>? ( Give both numerical
			vector form, and individual equations for each element )
		</p>

		<hr />

		<strong>Unit Vector</strong>

		<p>
			There's a specialized type of vector called a unit vector, it's any vector with a magnitude
			/length of 1. There's a big reason it's called a unit vector, and it definitely ties back to
			the unit circle from before!
		</p>

		<p>
			For a moment, take another glance at both the moving and actual vectors above. They have
			different x values, but still have the same length: √(2). This is because vectors of any
			number of dimensions all obey pythagoras theorem: a2+b2=c2, or hypotenuse = √(a2+b2). For
			vectors of 1 dimension, the magnitude is itself. For vectors of 3 dimensions, the magnitude
			is √(a2+b2+c2), and so on.
		</p>

		<p>
			Any vector can be normalized to a unit vector by dividing it by its length, and the results
			are incredibly useful as you can see in other articles within the library. The terms become
			trigonometric values, and can be applied in a wide range of scenarios as a set of scalars,
			or in element wise operations.
		</p>
    </>;
}