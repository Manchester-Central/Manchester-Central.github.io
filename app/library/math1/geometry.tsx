import UnitCircleDemo from "./components/unit-circle";

export function Geometry() {
    return <>
		<p>
			Geometry is so critical to everything we do. Spatial reasoning, mechanical engineering,
			rushing through the grocery store as quick as possible, or maybe you recently found out
			just how many things can fit into the square hole.
		</p>

		<p>
			It is especially important to robotics and CAD software. Computer-Aided Design software
			is not explicitly a tool for laying out geometry with automated equations and analysis
			for engineers, but that is what the term has become. If you haven't taken a class on CAD
			from any mentors, give it a shot. It will expand your knowledge of robot design quite a bit!
		</p>

		<strong>Trigonometry</strong>

		<p>
			This is the study on the relationship between triangles and circles. While
			at a surface level the two couldn't be <i>less</i> similar, they are in fact
			tightly related by the way of right triangles and the unit circle. Pay close
			attention to the relationship between degrees and radians, 1π = 180<sup>°</sup>.
		</p>

		<p>
			Lets get the unit circle out of the way first, it's a very special and powerful
			shape. The unit circle has a radius of 1, and its points can be represented in
			either cartesian coordinates (ie, &#123;x, y&#125;) or polar coordinates (ie, &#123;θ, r&#125;).
			Note that in polar coordinates since the radius is always 1 it can be left off if stated.
		</p>

		<div className='centered-content'>
            <UnitCircleDemo/>
        </div>

		<p>
			What's great about this shape is that each point on the circle represents
			a pair of calculations: &#123;x, y&#125; = &#123;cos(θ), sin(θ)&#125;. Each can be
			derived from the other. This relationship comes up constantly in the real
			world, engineering, and physics, whether it's intended or not.
		</p>

		<p>
			Now lets look at the right triangle. That previous relationship only holds
			true in a right triangle: a triangle with a 90 degree angle. This is because
			of the identity property of 1. When you form the pythagorean equation with
			a unit circle, you see that c=1 and 1=a<sup>2</sup>+b<sup>2</sup>. It may not seem like much,
			but this simple equation opens up a <i>lot</i> of doors.
		</p>

		<p className="question">
			Given value of a point on the unit circle, could you calculate the <i>y</i> value if you know
			the <i>x</i> value is sin(π/6)? <br />
			( sin() is deliberate, keep your answer in terms of cos() or sin() )
		</p>

		<hr />

		<strong>Arc Length</strong>

		<p>
			Lets build off the idea of curved distances, and for simplicities sake we'll use a circle still. This is something called an
			<a href="https://andymath.com/wp-content/uploads/2022/05/Screen-Shot-2022-05-17-at-12.14.25-PM.png">Arc Length</a>.
			You can estimate the distance of an arc length by drawing a <a href="https://en.wikipedia.org/wiki/Chord_(geometry)"><i>chord</i></a>
			between two points on a circle, and calculating the length of that line. Since you've just graduate from Trigonometry School,
			you can calculate those two points along any circle. As a hint to make this simpler, you can actually tackle this problem by
			starting off with only 1 point because any arclength of radius θ has the same result at any spot on a circle, and the
			start of a circle is always at &#123;r, 0&#125; which is both a polar coordinate &#123;r, θ&#125; and a cartesian coordiate &#123;x, y&#125;.
			Once you have your second coordinate in cartesian values, observe that the chord is shorter than the arclength over those 2 points.
		</p>

		<p>
			This is an estimate, and as you add more points and make smaller and smaller line segments, you get a total
			distance that grows and converges on the real value: θ<sub>radians</sub> * r.
		</p>
		
		<p className="question">
			Knowing this, what would be the arc length of a circle over 138 degrees if that circle had a radius 3.5 times the radius of a unit circle?
		</p>
		
		<p>
			Congratulations! You've just stumbled upon the origin of Euler's Method (pronounced oiler), and one of the
			basic principles of calculus!
		</p>
		
		<p>
			Still not convinced? Lets think about the circumference of a circle, which is πd or 2πr. If you have a
			90<sup>°</sup> angle, that's 1/4 of the circumference and our arc length equation says we should get
			1/2πr.
			So if we start with c=2/1*πr=4/2*πr, and you divide both sides by 4, you get 1/4*c=1/2πr, which
			definitely
			matches!
		</p>
    </>;
}